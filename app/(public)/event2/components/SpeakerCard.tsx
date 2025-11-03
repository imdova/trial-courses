import {
  FacebookRounded,
  Instagram,
  LinkedIn,
  Twitter,
} from "@mui/icons-material";
import Image from "next/image";
import Link from "next/link";

interface Speaker {
  id: number;
  name: string;
  role: string;
  image: string;
  socialLinks: {
    twitter?: string;
    linkedin?: string;
    instagram?: string;
    facebook?: string;
  };
}
const SpeakerCard = ({ speaker }: { speaker: Speaker }) => {
  return (
    <div className="overflow-hidden transition-all duration-300 hover:-translate-y-1">
      <Link href={"#"}>
        <div className="relative flex h-fit flex-col items-center overflow-hidden">
          <div className="h-[170px] w-[170px] md:h-[250px] md:w-[250px]">
            <Image
              src={speaker.image}
              width={400}
              height={400}
              alt={speaker.name}
              className="h-full w-full rounded-full object-cover transition-transform duration-500"
            />
          </div>
        </div>
        <div className="p-6 text-center">
          <h3 className="mb-1 text-xl font-bold text-slate-800">
            {speaker.name}
          </h3>
          <p className="text-primary font-medium">{speaker.role}</p>
        </div>
      </Link>

      {/* Social Links */}
      <div className="flex justify-center space-x-3">
        {speaker.socialLinks.twitter && (
          <a
            href={speaker.socialLinks.twitter}
            className="hover:bg-primary hover:border-primary text-primary rounded-full border border-gray-200 bg-white p-2 transition-colors hover:text-white"
          >
            <Twitter className="h-3 w-3" />
          </a>
        )}
        {speaker.socialLinks.linkedin && (
          <a
            href={speaker.socialLinks.linkedin}
            className="hover:bg-primary hover:border-primary bg-whitey text-primary rounded-full border border-gray-200 p-2 transition-colors hover:text-white"
          >
            <LinkedIn className="h-3 w-3" />
          </a>
        )}
        {speaker.socialLinks.instagram && (
          <a
            href={speaker.socialLinks.instagram}
            className="hover:bg-primary hover:border-primary text-primary rounded-full border border-gray-200 bg-white p-2 transition-colors hover:text-white"
          >
            <Instagram className="h-3 w-3" />
          </a>
        )}
        {speaker.socialLinks.facebook && (
          <a
            href={speaker.socialLinks.facebook}
            className="hover:bg-primary hover:border-primary text-primary rounded-full border border-gray-200 bg-white p-2 transition-colors hover:text-white"
          >
            <FacebookRounded className="h-3 w-3" />
          </a>
        )}
      </div>
    </div>
  );
};

export default SpeakerCard;
