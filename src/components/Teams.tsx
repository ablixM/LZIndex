import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Heart } from "lucide-react";
import teamImage from "../assets/images.jpg";

interface TeamMember {
  name: string;
  image: string;
  initials: string;
}

const teamMembers: TeamMember[] = [
  { name: "JD", image: teamImage, initials: "JD" },
  { name: "AS", image: teamImage, initials: "AS" },
  { name: "MK", image: teamImage, initials: "MK" },
  { name: "MK", image: teamImage, initials: "MK" },
];
function Teams() {
  return (
    <div className="container relative z-10 flex flex-col gap-8 py-8 max-w-[1400px] mx-auto px-4 sm:px-6">
      <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 bg-primary/80 ">
        <span className="text-xs sm:text-sm text-white flex items-center bg-primary/90 px-3 py-1.5 rounded-md shadow-sm">
          Made with{" "}
          <Heart className="w-3 h-3 sm:w-4 sm:h-4 mx-1.5 text-red-500 animate-pulse" />{" "}
          by
        </span>
        <div className="flex items-center justify-center">
          {teamMembers.map((member, index) => (
            <Avatar
              key={index}
              className={`
               
                ${index !== 0 ? "-ml-3" : ""}
                border-2 border-background rounded-full overflow-hidden
                w-8 h-8 sm:w-10 sm:h-10
              `}
            >
              <AvatarImage
                src={member.image}
                alt={member.name}
                className="object-cover rounded-full w-full h-full"
              />
              <AvatarFallback className="text-xs sm:text-sm rounded-full">
                {member.initials}
              </AvatarFallback>
            </Avatar>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Teams;
