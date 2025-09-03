import { useForm } from 'react-hook-form'
import './App.css'

import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

const queryClient = new QueryClient()
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


  return (
    <div className="gasuse-form-card">
      <form className="gasuse-form" onSubmit={form.handleSubmit((data) => console.log(data))}>
        <h2>Gas Use Form</h2>
        <div className="form-row">
          <label htmlFor="date">Date</label>
          <input id="date" type="date" {...form.register("date")} />
        </div>
        <div className="form-row">
          <label htmlFor="time">Time</label>
          <input id="time" type="time" {...form.register("time")} />
        </div>
        <div className="form-row">
          <label htmlFor="car_id">Car ID</label>
          <input id="car_id" type="text" {...form.register("car_id")} />
        </div>
        <div className="form-row">
          <label htmlFor="soldier_id">Soldier ID</label>
          <input id="soldier_id" type="text" {...form.register("soldier_id")} />
        </div>
        <div className="form-row">
          <label htmlFor="first_name">First Name</label>
          <input id="first_name" type="text" {...form.register("first_name")} />
        </div>
        <div className="form-row">
          <label htmlFor="last_name">Last Name</label>
          <input id="last_name" type="text" {...form.register("last_name")} />
        </div>
        <div className="form-row">
          <label htmlFor="unit">Unit</label>
          <input id="unit" type="text" {...form.register("unit")} />
        </div>
        <div className="form-row">
          <label htmlFor="start_gas_count">Start Gas Count</label>
          <input id="start_gas_count" type="number" {...form.register("start_gas_count")} />
        </div>
        <div className="form-row">
          <label htmlFor="end_gas_count">End Gas Count</label>
          <input id="end_gas_count" type="number" {...form.register("end_gas_count")} />
        </div>
        <div className="form-row">
          <label htmlFor="signature">Signature</label>
          <input id="signature" type="text" {...form.register("signature")} />
        </div>
        <button className="submit-btn" type="submit">Submit</button>
      </form>
    </div>
  )


}



