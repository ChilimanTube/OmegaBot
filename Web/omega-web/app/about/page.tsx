export default function About(){
    return(
       <main className="flex min-h-screen flex-col items-center justify-between p-24">
              <h1>About</h1>
                <p>This is the about page</p>
                <div >
                    <button className="border-b border-gray-300 border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30">
                        <a href="/">Home</a>
                    </button>
                </div>
       </main>
    )
}