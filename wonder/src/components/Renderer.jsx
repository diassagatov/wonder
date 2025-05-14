import React from "react";

function Renderer({ user }) {
  if (!user)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-pulse text-center text-gray-500">
          <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gray-200"></div>
          Loading...
        </div>
      </div>
    );

  return (
    <div className="px-4 py-12 md:py-16 max-w-4xl mx-auto space-y-16 font-sans text-gray-800">
      {user.sections.map((section, index) => {
        switch (section.type) {
          case "name":
            return (
              <header key={index} className="text-center">
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900">
                  {section.content.name}
                </h1>
              </header>
            );

          case "about":
            return (
              <section key={index} className="text-center max-w-2xl mx-auto">
                <p className="text-lg text-gray-600 leading-relaxed">
                  {section.content.text}
                </p>
              </section>
            );

          case "cards":
            return (
              <section key={index} className="space-y-6">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">
                  Featured
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {section.content.cards.map((card, i) => (
                    <a
                      key={i}
                      href={card.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block p-6 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-200"
                    >
                      <h3 className="text-xl font-semibold mb-2 text-blue-600 group-hover:text-blue-700 transition-colors">
                        {card.title}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {card.description}
                      </p>
                    </a>
                  ))}
                </div>
              </section>
            );

          case "socials":
            return (
              <section key={index} className="space-y-6">
                <h2 className="text-2xl font-bold text-center text-gray-800">
                  Connect
                </h2>
                <div className="flex justify-center gap-4 flex-wrap">
                  {section.content.links.map((link, i) => (
                    <a
                      key={i}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-lg bg-gray-50 hover:bg-gray-100 text-gray-700 hover:text-gray-900 transition-colors flex items-center gap-2"
                    >
                      {link.icon && (
                        <span className="text-lg">{link.icon}</span>
                      )}
                      {link.label}
                    </a>
                  ))}
                </div>
              </section>
            );

          case "skills":
            return (
              <section key={index} className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-800">Skills</h2>
                <div className="flex flex-wrap gap-2">
                  {section.content.skills.map((skill, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-gray-100 text-sm rounded-full border border-gray-200 text-gray-700"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </section>
            );

          case "projects":
            return (
              <section key={index} className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-800">Projects</h2>
                <div className="space-y-6">
                  {section.content.projects.map((project, i) => (
                    <div
                      key={i}
                      className="group p-6 border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-200"
                    >
                      <div className="flex flex-col md:flex-row gap-6">
                        {project.image && (
                          <div className="md:w-1/3">
                            <img
                              src={project.image}
                              alt={project.title}
                              className="w-full h-auto rounded-lg object-cover"
                            />
                          </div>
                        )}
                        <div
                          className={`${project.image ? "md:w-2/3" : "w-full"}`}
                        >
                          <h3 className="text-xl font-semibold text-gray-800">
                            {project.title}
                          </h3>
                          <p className="text-gray-600 mt-2">
                            {project.description}
                          </p>
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center mt-4 text-blue-600 hover:text-blue-700 hover:underline transition-colors"
                          >
                            View Project
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4 ml-1"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M14 5l7 7m0 0l-7 7m7-7H3"
                              />
                            </svg>
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            );

          default:
            return null;
        }
      })}
    </div>
  );
}

export default Renderer;
