import express from 'express';
import { google } from 'googleapis';
import cors from 'cors';
import { z } from 'zod';
import dotenv from 'dotenv';
dotenv.config();
// console.log(process.env)
const GasUseFormZod = z.object({
    date: z.string(),
    time: z.string(),
    car_id: z.string(),
    soldier_id: z.string(),
    first_name: z.string().min(2).max(100),
    last_name: z.string().min(2).max(100),
    unit: z.string(),
    start_gas_count: z.number(),
    end_gas_count: z.number(),
    signature: z.string()
});
const auth = new google.auth.GoogleAuth({
    keyFile: 'gasuse_key.json', // path to downloaded JSON
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});
const spreadsheetId = process.env.SPREADSHEET_ID ?? ''; // spreadsheet ID
async function readSheet() {
    //   const client = await auth.getClient();
    const sheets = google.sheets({ version: 'v4', auth });
    const res = await sheets.spreadsheets.values.get({
        spreadsheetId,
        range: 'Sheet1!A1:J1', // Adjust the range
    });
    console.log('Sheet data:', res.data.values);
    return res.data.values;
}
async function appendRow(data) {
    await auth.getClient();
    const sheets = google.sheets({ version: 'v4', auth });
    const values = [
        [
            data.date,
            data.time,
            data.car_id,
            data.soldier_id,
            data.first_name,
            data.last_name,
            data.unit,
            data.start_gas_count,
            data.end_gas_count,
            data.signature
        ]
    ];
    await sheets.spreadsheets.values.append({
        spreadsheetId,
        range: 'Sheet1!A1', // start range (can be any column in row 1)
        valueInputOption: 'RAW',
        insertDataOption: 'INSERT_ROWS',
        requestBody: {
            values,
        },
    });
    console.log('✅ Row appended');
}
const app = express();
app.use(express.json()); // add this so the data is as json
app.use(cors({
    origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
    // origin: ['*']
}));
app.post('/api/gas-use', async (req, res) => {
    console.log(req.body);
    const result = GasUseFormZod.safeParse(req.body);
    if (!result.success) {
        return res.status(400).json({ errors: result.error });
    }
    const data = result.data;
    await appendRow(data);
    res.status(201).json({ message: 'Row added successfully' });
});
app.get('/api/gas-use', async (req, res) => {
    const result = await readSheet();
    res.status(200).json({ data: result ?? 'test' });
});
// serve the static files in the public folder when the index.html is the default file
app.use(express.static('public'));
app.listen(process.env.PORT ?? 3300, () => {
    console.log('I am listening!!!!');
    // appendRow()
    // readSheet()
});
//# sourceMappingURL=app.js.map