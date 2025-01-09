import ContactLink from "./ContactLink";

export default function Footer() {
  return (
    <div className="bg-slate-800 opacity-40 rounded-md flex justify-between items-center w-[90%] lg:w-[80%] mx-auto  py-2 px-5 md:px-10">
      <span className="font-medium text-sm md:text-base">Puzzingo &copy; Tomefy 2025</span>
      <ContactLink/>
    </div>
  )
}
