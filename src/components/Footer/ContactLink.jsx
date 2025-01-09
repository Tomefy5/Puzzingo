import { Github, Facebook } from "lucide-react";

const contactList = [
  { contact: "facebook", Logo: Facebook, link: "#" },
  { contact: "github", Logo: Github, link: "#" },
];

export default function ContactLink() {
  return (
    <div className="flex gap-2 md:gap-5">
      {contactList.map((contact, index) => (
        <a key={index} href={contact.link} target="_blank" className="bg-slate-700 hover:bg-slate-800 hover:text-white duration-200 p-[8px] rounded-full">
          <contact.Logo className="h-[18px] md:h-[20px]" />
        </a>
      ))}
    </div>
  );
}
