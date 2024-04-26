import Logo from "@/image/logo/Logo";
import Text from "@/image/logo/Text";
import LoginButton from "@/components/spotify/LoginButton";

const Login: React.FC = () => {
  return (
    <main className="flex flex-wrap min-h-screen flex-col items-center p-10">
        <div className="flex items-center justify-center">
          <Logo className="w-1/4 p-3"/>
          <Text className="w-1/2"/>
        </div>
        <div className="flex flex-col items-center w-2/4 basis-full shrink-0 flex-grow bg-gray-900 border rounded-lg border-gray-900">
          <div className="text-3xl font-bold p-10">Login for Eternal</div>
          <div className="w-2/4 p-10">
            <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Email
            </label>
            <input
              type="text"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Email or username"
              required
            />
            </div>
            <br/>
            <div>
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Password"
                required
              />
            </div>
            <br/>
            <div className="flex flex-col items-center justify-center">
              <button type="button" className="text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900 w-full group">
                <div className="flex items-center justify-center">
                  <Logo className="group-hover:rotate-45" width="35" height="35"/>
                  <span className="pl-1">Login</span> 
                </div>
              </button>
              <LoginButton/>
            </div>
          </div>
        </div>
    </main>
  )
};

export default Login;
