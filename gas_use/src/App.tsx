import { useForm } from 'react-hook-form'
import { useState } from 'react';
import './App.css'

import {
  // useQuery,
  // useQueryClient,
  useMutation,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

const queryClient = new QueryClient()

export const URL = '' as const;
function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <GasUseForm />
      </div>
    </QueryClientProvider>
  )
}

export default App



interface GasUseFormI {
  date: string;
  time: string;
  car_id: string;
  soldier_id: string;
  first_name: string;
  last_name: string;
  unit: string;
  start_gas_count: number;
  end_gas_count: number;
  signature: string;
}

export function GasUseForm() {
  
  const form = useForm<GasUseFormI>({
    defaultValues: {
      date: new Date().toISOString().split('T')[0], // set initial value for date today
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), // set initial value for time now
      car_id: '',
      soldier_id: '',
      first_name: '',
      last_name: '',
      unit: '',
      start_gas_count: 0,
      end_gas_count: 0,
      signature: '',
    }
  })

  const [showThankYou, setShowThankYou] = useState(false);
  const mutation = useMutation({
    mutationKey: ['add-gas-use'],
    mutationFn: async (data: GasUseFormI) => {
      data.start_gas_count = parseInt(data.start_gas_count.toString());
      data.end_gas_count = parseInt(data.end_gas_count.toString());
      const response = await fetch(`${URL}/api/gas-use`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      console.log(response)
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response;
    },
    onSuccess: () => {
      setShowThankYou(true);
      setTimeout(() => {
        window.location.reload();
      }, 10000);
    },
  });


  return (
    <div className="gasuse-form-card">
      {showThankYou ? (
        <div className="thank-you-message">
          <h2>Thank you for filling the form!</h2>
          <p>The page will refresh in 10 seconds.</p>
        </div>
      ) : (
        <form className="gasuse-form" onSubmit={form.handleSubmit((data) => {
          mutation.mutate(data);
        })}>
          <h2>Gas Use Form</h2>
          <div className="form-row">
            <label htmlFor="date">Date (תאריך)</label>
            <input id="date" type="date" {...form.register("date")} />
          </div>
          <div className="form-row">
            <label htmlFor="time">Time (שעה)</label>
            <input id="time" type="time" {...form.register("time")} />
          </div>
          <div className="form-row">
            <label htmlFor="car_id">Car ID (מספר רכב)</label>
            <input id="car_id" type="text" {...form.register("car_id")} />
          </div>
          <div className="form-row">
            <label htmlFor="soldier_id">Soldier ID (מספר אישי)</label>
            <input id="soldier_id" type="text" {...form.register("soldier_id")} />
          </div>
          <div className="form-row">
            <label htmlFor="first_name">First Name (שם פרטי)</label>
            <input id="first_name" type="text" {...form.register("first_name")} />
          </div>
          <div className="form-row">
            <label htmlFor="last_name">Last Name (שם משפחה)</label>
            <input id="last_name" type="text" {...form.register("last_name")} />
          </div>
          <div className="form-row">
            <label htmlFor="unit">Unit (יחידה)</label>
            <input id="unit" type="text" {...form.register("unit")} />
          </div>
          <div className="form-row">
            <label htmlFor="start_gas_count">Start Gas Count (ספירת גז התחלה)</label>
            <input id="start_gas_count" type="number" {...form.register("start_gas_count")} />
          </div>
          <div className="form-row">
            <label htmlFor="end_gas_count">End Gas Count (ספירת גז סיום)</label>
            <input id="end_gas_count" type="number" {...form.register("end_gas_count")} />
          </div>
          <div className="form-row">
            <label htmlFor="signature">Signature (חתימה)</label>
            <input id="signature" type="text" {...form.register("signature")} />
          </div>
          <button className="submit-btn" type="submit">Submit</button>
        </form>
      )}
    </div>
  )


}



