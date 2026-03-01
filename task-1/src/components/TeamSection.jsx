import members from "../teamMembers";
import MemberCard from "./MemberCard";
import DarkVeil from "./DarkVeil"; 

export default function TeamSection() {

 
  const grouped = members.reduce((acc, member) => {
    if (!acc[member.position]) {
      acc[member.position] = [];
    }
    acc[member.position].push(member);
    return acc;
  }, {});

  return (
    <section className="relative min-h-screen px-4 sm:px-6 py-16 flex flex-col items-center">


      <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }}>
        <DarkVeil
          hueShift={0}
          noiseIntensity={0}
          scanlineIntensity={0}
          speed={2}
          scanlineFrequency={0}
          warpAmount={0}
        />
      </div>

 
      <div className="relative max-w-6xl w-full text-center" style={{ zIndex: 1 }}>

   
        <div className="mb-12">
          <p className="text-xs tracking-[0.14em] uppercase mb-2 text-white/30">
            IEEE RITB Student Branch
          </p>
          <h2 className="text-white text-3xl sm:text-4xl font-extrabold tracking-tight">
            Meet Our Team
          </h2>
        </div>

        {Object.entries(grouped).map(([position, people]) => (
          <div key={position} className="mb-14 flex flex-col items-center">

            <h3 className="text-xl sm:text-2xl font-semibold text-blue-400 mb-6">
              {position}
            </h3>

            <div className="w-full border-t border-white/10 mb-8" />

            <div className="flex flex-wrap justify-center gap-4 w-full overflow-visible">
              {people.map((person) => (
                <MemberCard key={person.id} member={person} />
              ))}
            </div>

          </div>
        ))}

      </div>
    </section>
  );
}