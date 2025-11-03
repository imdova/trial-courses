import { Academy } from "@/types/academy";
import React from "react";

const AcademyInfo: React.FC<{ academy: Academy }> = ({ academy }) => {
  // Collect the available top info fields
  const topInfo = [
    academy.keyWords?.[0],
    academy.type,
    academy.foundedYear && `Founded ${academy.foundedYear}`,
    academy.size && `${academy.size} Employees`,
    academy.displayRealStudentsCount
      ? `${academy.displayRealStudentsCount} Students`
      : `${academy.fakeStudentsCount} Students`,
  ].filter(Boolean);

  // Combine location parts safely
  const locationParts = [academy.city?.name, academy.country?.name].filter(
    Boolean,
  );

  const location = locationParts.length ? locationParts.join(", ") : "";
  const address = academy.address ? ` — ${academy.address}` : "";

  return (
    <div className="text-primary-foreground space-y-1">
      {topInfo.length > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          {topInfo.map((item, index) => (
            <React.Fragment key={index}>
              <p className="text-sm font-medium">{item}</p>
              {index < topInfo.length - 1 && <span className="text-sm">|</span>}
            </React.Fragment>
          ))}
        </div>
      )}
      <p className="text-sm font-medium">{academy.description}</p>

      {(location || academy.address) && (
        <address className="text-sm font-medium not-italic">
          {location}
          {address}
        </address>
      )}
    </div>
  );
};

export default AcademyInfo;
