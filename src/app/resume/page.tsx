'use client';
import React, { useEffect, useState } from 'react';
import { type JsonResume } from '@/types/JsonResume';
import { GrLinkedin } from 'react-icons/gr';

export const Page = (): any => {
  const [resumeData, setResumeData] = useState<JsonResume | null>(null);

  useEffect(() => {
    async function getResumeData() {
      const response = await fetch('/resume.json');
      const data = (await response.json()) as JsonResume;
      return data;
    }

    getResumeData().then((data) => {
      setResumeData(data);
    });
  }, []);

  const [selectedSkill, setSelectedSkill] = useState<string>('');

  const actualSkills = resumeData?.work?.reduce((acc, job) => {
    if (job.usedSkills != null) {
      return acc.concat(job.usedSkills);
    }
    return acc;
  }, [] as string[]);
  const usedSkills = actualSkills?.filter((skill, index) => {
    return actualSkills?.indexOf(skill) === index;
  });

  const enterSkill = (
    event: React.MouseEvent<HTMLTableCellElement, MouseEvent>
  ): void => {
    const skill = event.currentTarget.textContent;
    if (skill) {
      setSelectedSkill(skill);
    }
  };

  const leaveSkill = (): void => {
    setSelectedSkill('');
  };

  return (
    <div className="h-full w-full">
      <table id="skills_table" className="px-1 text-xs sm:text-sm">
        <caption className="hidden">Eddie Dover&apos;s skills</caption>
        <thead>
          <tr>
            <th scope="col">
              <h1 className={`text-center mb-2 mt-2 font-bold text-2xl`}>
                Skills
              </h1>
            </th>
          </tr>
        </thead>
        <tbody className={`flex flex-row flex-wrap justify-center mx-5`}>
          {usedSkills?.map((skill) => {
            return (
              <tr key={skill} className="m-0.5">
                <td
                  onMouseEnter={enterSkill}
                  onMouseLeave={leaveSkill}
                  onClick={() => {
                    setSelectedSkill(skill ?? '');
                  }}
                  key={skill}
                  className={`p-1 rounded border border-black cursor-pointer`}
                >
                  <p className="text-center">{skill}</p>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className={`flex mt-5 flex-col w-full`}>
        <div className="flex flex-row mx-auto whitespace-nowrap">
          For a full resume, please contact me on
          <a
            href={resumeData?.basics?.profiles?.[0]?.url}
            target="_blank"
            rel="noreferrer noopener"
            className="flex flex-row underline"
          >
            <span className="p-1">
              <GrLinkedin />
            </span>{' '}
            LinkedIn
          </a>
        </div>
        <h1 className={`text-center mb-2 mt-2 font-bold text-2xl`}>
          Employment History
        </h1>
        <div className="flex flex-col mx-auto w-fit">
          <table className="px-1 table-auto">
            <caption className="hidden">
              Eddie Dover&apos;s employment history
            </caption>
            <thead className="invisible hidden sm:visible sm:table-header-group">
              <tr>
                <th scope="col">Company Name</th>
                <th scope="col">Job Title</th>
                <th scope="col">Start Date</th>
                <th scope="col">End Date</th>
              </tr>
            </thead>
            <tbody>
              {resumeData?.work?.map((job) => {
                return (
                  <tr
                    key={job.name}
                    className={`${
                      job.usedSkills?.includes(selectedSkill) === true
                        ? 'border-black'
                        : 'border-transparent'
                    } sm:py-2 border-dotted border-2 m-2 sm:text-center flex flex-col sm:table-row`}
                  >
                    <td className="text-center sm:text-left">
                      {job.url != null ? (
                        <a
                          href={job.url}
                          className="underline"
                          rel="noreferrer"
                          target="_blank"
                        >
                          &lt;{job.name}&gt;
                        </a>
                      ) : (
                        job.name
                      )}
                    </td>
                    <td className="text-center">{job.position}</td>
                    <td className="text-center whitespace-nowrap">
                      {job.startDate}
                    </td>
                    <td className="text-center whitespace-nowrap">
                      {job.endDate != null ? job.endDate : 'PRESENT'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="flex-col mx-auto w-fit hidden">
          <h1 className={`text-center mb-2 mt-2 font-bold text-2xl`}>
            Certifications
          </h1>
          <table className="px-1 table-auto">
            <caption className="hidden">
              Eddie Dover&apos;s certification and award history
            </caption>
            <thead className="invisible hidden sm:visible sm:table-header-group">
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Issuer</th>
                <th scope="col">Obtained</th>
                <th scope="col">Expires</th>
              </tr>
            </thead>
            <tbody>
              {resumeData?.certificates
                ?.sort((a, b) => {
                  if (
                    new Date(a.startDate ?? '') < new Date(b.startDate ?? '')
                  ) {
                    return 1;
                  }
                  if (
                    new Date(a.startDate ?? '') > new Date(b.startDate ?? '')
                  ) {
                    return -1;
                  }
                  return 0;
                })
                .sort((a, b) => {
                  if (
                    (a.name?.toLowerCase() ?? '') <
                    (b.name?.toLowerCase() ?? '')
                  ) {
                    return -1;
                  }
                  if (
                    (a.name?.toLowerCase() ?? '') >
                    (b.name?.toLowerCase() ?? '')
                  ) {
                    return 1;
                  }
                  return 0;
                })
                .map((cert) => {
                  return (
                    <tr
                      key={cert.name?.toLowerCase().replaceAll(' ', '-')}
                      className={`sm:py-2 m-2 sm:m-0 border sm:border-0 sm:text-center flex flex-col sm:table-row`}
                    >
                      <td className="text-center sm:text-left">
                        {cert.url != null ? (
                          <a
                            href={cert.url}
                            rel="noreferrer"
                            target="_blank"
                            className="underline"
                          >
                            &lt;{cert.name}&gt;
                          </a>
                        ) : (
                          cert.name
                        )}
                      </td>
                      <td className="text-center">{cert.issuer}</td>
                      <td className="text-center">{cert.startDate}</td>
                      <td className="text-center">
                        {cert.endDate != null ? cert.endDate : 'NO EXP DATE'}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Page;
