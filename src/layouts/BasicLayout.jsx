import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";

export default function BasicLayout({children}) {
  return (
    <div className="flex flex-col justify-between w-full lg:w-[90%] xl:w-[70%] mx-auto pt-6 lg:pt-8 pb-3 px-4">
        <Header/>
        <main className="flex-grow my-5 p-5">
            {children}
        </main>
        <Footer/>
    </div>
  )
}
