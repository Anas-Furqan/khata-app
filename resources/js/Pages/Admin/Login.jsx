import { useForm } from '@inertiajs/react'

export default function Login() {
  const { data, setData, post, errors } = useForm({
    email: '', password: ''
  })

  const submit = (e) => {
    e.preventDefault()
    post(route('admin.login.attempt'))
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-700 to-indigo-800 flex justify-center items-center">
      <form onSubmit={submit} className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-indigo-700 mb-6">Admin Login</h2>
        <input type="email" placeholder="Email" className="w-full mb-4 p-3 border rounded"
          value={data.email} onChange={e => setData('email', e.target.value)} />
        <input type="password" placeholder="Password" className="w-full mb-4 p-3 border rounded"
          value={data.password} onChange={e => setData('password', e.target.value)} />
        {errors.email && <p className="text-red-600 text-sm mb-2">{errors.email}</p>}
        <button type="submit" className="w-full bg-indigo-600 text-white py-3 rounded hover:bg-indigo-700">
          Login
        </button>
      </form>
    </div>
  )
}
