import React, { useState, useEffect } from "react";
import Renderer from "./Renderer";
import { ArrowUp, ArrowDown, X, Plus, Save, Undo2 } from "lucide-react";

function Creator({ user }) {
  const [editedUser, setEditedUser] = useState(user || { sections: [] });
  const [originalUser, setOriginalUser] = useState(user || { sections: [] });
  const [isSaving, setIsSaving] = useState(false);
  const [activeSection, setActiveSection] = useState(null);

  useEffect(() => {
    setEditedUser(user || { sections: [] });
    setOriginalUser(user || { sections: [] });
  }, [user]);

  const handleContentChange = (sectionIndex, field, value) => {
    const updatedSections = [...editedUser.sections];
    updatedSections[sectionIndex].content[field] = value;
    setEditedUser({ ...editedUser, sections: updatedSections });
  };

  const handleCardChange = (sectionIndex, cardIndex, field, value) => {
    const updatedSections = [...editedUser.sections];
    updatedSections[sectionIndex].content.cards[cardIndex][field] = value;
    setEditedUser({ ...editedUser, sections: updatedSections });
  };

  const handleProjectChange = (sectionIndex, projectIndex, field, value) => {
    const updatedSections = [...editedUser.sections];
    updatedSections[sectionIndex].content.projects[projectIndex][field] = value;
    setEditedUser({ ...editedUser, sections: updatedSections });
  };

  const handleSocialChange = (sectionIndex, socialIndex, field, value) => {
    const updatedSections = [...editedUser.sections];
    updatedSections[sectionIndex].content.links[socialIndex][field] = value;
    setEditedUser({ ...editedUser, sections: updatedSections });
  };

  const handleSkillChange = (sectionIndex, skillIndex, value) => {
    const updatedSections = [...editedUser.sections];
    updatedSections[sectionIndex].content.skills[skillIndex] = value;
    setEditedUser({ ...editedUser, sections: updatedSections });
  };

  const addCard = (sectionIndex) => {
    const updatedSections = [...editedUser.sections];
    updatedSections[sectionIndex].content.cards.push({
      title: "",
      description: "",
      link: "",
    });
    setEditedUser({ ...editedUser, sections: updatedSections });
  };

  const removeCard = (sectionIndex, cardIndex) => {
    const updatedSections = [...editedUser.sections];
    updatedSections[sectionIndex].content.cards.splice(cardIndex, 1);
    setEditedUser({ ...editedUser, sections: updatedSections });
  };

  const addProject = (sectionIndex) => {
    const updatedSections = [...editedUser.sections];
    updatedSections[sectionIndex].content.projects.push({
      title: "",
      description: "",
      image: "",
      link: "",
    });
    setEditedUser({ ...editedUser, sections: updatedSections });
  };

  const removeProject = (sectionIndex, projectIndex) => {
    const updatedSections = [...editedUser.sections];
    updatedSections[sectionIndex].content.projects.splice(projectIndex, 1);
    setEditedUser({ ...editedUser, sections: updatedSections });
  };

  const addSocial = (sectionIndex) => {
    const updatedSections = [...editedUser.sections];
    updatedSections[sectionIndex].content.links.push({
      label: "",
      url: "",
    });
    setEditedUser({ ...editedUser, sections: updatedSections });
  };

  const removeSocial = (sectionIndex, socialIndex) => {
    const updatedSections = [...editedUser.sections];
    updatedSections[sectionIndex].content.links.splice(socialIndex, 1);
    setEditedUser({ ...editedUser, sections: updatedSections });
  };

  const addSkill = (sectionIndex) => {
    const updatedSections = [...editedUser.sections];
    updatedSections[sectionIndex].content.skills.push("");
    setEditedUser({ ...editedUser, sections: updatedSections });
  };

  const removeSkill = (sectionIndex, skillIndex) => {
    const updatedSections = [...editedUser.sections];
    updatedSections[sectionIndex].content.skills.splice(skillIndex, 1);
    setEditedUser({ ...editedUser, sections: updatedSections });
  };

  const addSection = (type) => {
    const newSection = { type, content: {} };

    if (type === "name") newSection.content = { name: "" };
    if (type === "about") newSection.content = { text: "" };
    if (type === "skills") newSection.content = { skills: [] };
    if (type === "cards") newSection.content = { cards: [] };
    if (type === "projects") newSection.content = { projects: [] };
    if (type === "socials") newSection.content = { links: [] };

    setEditedUser({
      ...editedUser,
      sections: [...editedUser.sections, newSection],
    });
    setActiveSection(editedUser.sections.length);
  };

  const removeSection = (index) => {
    const updatedSections = [...editedUser.sections];
    updatedSections.splice(index, 1);
    setEditedUser({ ...editedUser, sections: updatedSections });
  };

  const moveSection = (index, direction) => {
    const updatedSections = [...editedUser.sections];
    const newIndex = index + direction;
    if (newIndex >= 0 && newIndex < updatedSections.length) {
      [updatedSections[index], updatedSections[newIndex]] = [
        updatedSections[newIndex],
        updatedSections[index],
      ];
      setEditedUser({ ...editedUser, sections: updatedSections });
    }
  };

  const discardChanges = () => {
    setEditedUser(originalUser);
    window.open("/");
  };

  const saveChanges = async () => {
    setIsSaving(true);
    try {
      const putResponse = await fetch(
        `http://localhost:3000/users/${user.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(editedUser),
        }
      );

      if (putResponse.ok) {
        window.open("/");
        setOriginalUser(editedUser);
        setIsSaving(false);
        return;
      }

      const postResponse = await fetch(
        `http://localhost:3000/users/${user.id}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(editedUser),
        }
      );

      if (postResponse.ok) {
        alert("User created successfully.");
        setOriginalUser(editedUser);
      } else {
        throw new Error("Both PUT and POST requests failed.");
      }
    } catch (error) {
      alert("Error saving user data: " + error.message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-80 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800">Edit Sections</h2>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {editedUser.sections.map((section, i) => (
            <div
              key={i}
              className={`mb-4 p-4 rounded-lg transition-all ${
                activeSection === i
                  ? "bg-blue-50 border border-blue-200"
                  : "bg-gray-50 hover:bg-gray-100"
              }`}
              onClick={() => setActiveSection(i)}
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold capitalize text-gray-700">
                  {section.type}
                </h3>
                <div className="flex items-center gap-1">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      moveSection(i, -1);
                    }}
                    className="p-1 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded"
                  >
                    <ArrowUp className="w-4 h-4" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      moveSection(i, 1);
                    }}
                    className="p-1 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded"
                  >
                    <ArrowDown className="w-4 h-4" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeSection(i);
                    }}
                    className="p-1 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {section.type === "name" && (
                <input
                  type="text"
                  value={section.content.name}
                  onChange={(e) =>
                    handleContentChange(i, "name", e.target.value)
                  }
                  className="w-full p-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Your name"
                />
              )}

              {section.type === "about" && (
                <textarea
                  value={section.content.text}
                  onChange={(e) =>
                    handleContentChange(i, "text", e.target.value)
                  }
                  className="w-full p-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[80px]"
                  placeholder="About you"
                />
              )}

              {section.type === "skills" && (
                <div className="space-y-2">
                  {section.content.skills.map((skill, skillIndex) => (
                    <div key={skillIndex} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={skill}
                        onChange={(e) =>
                          handleSkillChange(i, skillIndex, e.target.value)
                        }
                        className="flex-1 p-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Skill"
                      />
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          removeSkill(i, skillIndex);
                        }}
                        className="p-1 text-gray-500 hover:text-red-600 rounded"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addSkill(i);
                    }}
                    className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 mt-1"
                  >
                    <Plus className="w-3 h-3" /> Add Skill
                  </button>
                </div>
              )}

              {section.type === "cards" && (
                <div className="space-y-3">
                  {section.content.cards.map((card, cardIndex) => (
                    <div
                      key={cardIndex}
                      className="space-y-2 p-3 bg-white rounded border border-gray-200"
                    >
                      <input
                        type="text"
                        placeholder="Title"
                        value={card.title}
                        onChange={(e) =>
                          handleCardChange(
                            i,
                            cardIndex,
                            "title",
                            e.target.value
                          )
                        }
                        className="w-full p-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                      <input
                        type="text"
                        placeholder="Description"
                        value={card.description}
                        onChange={(e) =>
                          handleCardChange(
                            i,
                            cardIndex,
                            "description",
                            e.target.value
                          )
                        }
                        className="w-full p-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                      <input
                        type="text"
                        placeholder="Link URL"
                        value={card.link}
                        onChange={(e) =>
                          handleCardChange(i, cardIndex, "link", e.target.value)
                        }
                        className="w-full p-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          removeCard(i, cardIndex);
                        }}
                        className="text-xs text-red-600 hover:text-red-800 flex items-center gap-1"
                      >
                        <X className="w-3 h-3" /> Remove Card
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addCard(i);
                    }}
                    className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 mt-1"
                  >
                    <Plus className="w-3 h-3" /> Add Card
                  </button>
                </div>
              )}

              {section.type === "projects" && (
                <div className="space-y-3">
                  {section.content.projects.map((project, projectIndex) => (
                    <div
                      key={projectIndex}
                      className="space-y-2 p-3 bg-white rounded border border-gray-200"
                    >
                      <input
                        type="text"
                        placeholder="Title"
                        value={project.title}
                        onChange={(e) =>
                          handleProjectChange(
                            i,
                            projectIndex,
                            "title",
                            e.target.value
                          )
                        }
                        className="w-full p-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                      <input
                        type="text"
                        placeholder="Description"
                        value={project.description}
                        onChange={(e) =>
                          handleProjectChange(
                            i,
                            projectIndex,
                            "description",
                            e.target.value
                          )
                        }
                        className="w-full p-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                      <input
                        type="text"
                        placeholder="Image URL"
                        value={project.image}
                        onChange={(e) =>
                          handleProjectChange(
                            i,
                            projectIndex,
                            "image",
                            e.target.value
                          )
                        }
                        className="w-full p-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                      <input
                        type="text"
                        placeholder="Project URL"
                        value={project.link}
                        onChange={(e) =>
                          handleProjectChange(
                            i,
                            projectIndex,
                            "link",
                            e.target.value
                          )
                        }
                        className="w-full p-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          removeProject(i, projectIndex);
                        }}
                        className="text-xs text-red-600 hover:text-red-800 flex items-center gap-1"
                      >
                        <X className="w-3 h-3" /> Remove Project
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addProject(i);
                    }}
                    className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 mt-1"
                  >
                    <Plus className="w-3 h-3" /> Add Project
                  </button>
                </div>
              )}

              {section.type === "socials" && (
                <div className="space-y-3">
                  {section.content.links.map((link, linkIndex) => (
                    <div
                      key={linkIndex}
                      className="space-y-2 p-3 bg-white rounded border border-gray-200"
                    >
                      <input
                        type="text"
                        placeholder="Label (e.g. GitHub)"
                        value={link.label}
                        onChange={(e) =>
                          handleSocialChange(
                            i,
                            linkIndex,
                            "label",
                            e.target.value
                          )
                        }
                        className="w-full p-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                      <input
                        type="text"
                        placeholder="URL"
                        value={link.url}
                        onChange={(e) =>
                          handleSocialChange(
                            i,
                            linkIndex,
                            "url",
                            e.target.value
                          )
                        }
                        className="w-full p-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          removeSocial(i, linkIndex);
                        }}
                        className="text-xs text-red-600 hover:text-red-800 flex items-center gap-1"
                      >
                        <X className="w-3 h-3" /> Remove Link
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addSocial(i);
                    }}
                    className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 mt-1"
                  >
                    <Plus className="w-3 h-3" /> Add Social Link
                  </button>
                </div>
              )}
            </div>
          ))}

          <div className="mt-6">
            <h3 className="text-sm font-semibold text-gray-700 mb-2">
              Add New Section
            </h3>
            <div className="flex flex-wrap gap-2">
              {["name", "about", "skills", "cards", "projects", "socials"].map(
                (type) => (
                  <button
                    key={type}
                    onClick={() => addSection(type)}
                    className="flex items-center gap-1 px-3 py-1.5 text-xs bg-white border border-gray-300 rounded-md hover:bg-gray-50 text-gray-700"
                  >
                    <Plus className="w-3 h-3" /> {type}
                  </button>
                )
              )}
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-gray-200 bg-white">
          <div className="flex gap-3">
            <button
              onClick={discardChanges}
              className="flex-1 flex items-center justify-center gap-2 py-2 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md transition-colors"
            >
              <Undo2 className="w-4 h-4" /> Discard
            </button>
            <button
              onClick={saveChanges}
              disabled={isSaving}
              className="flex-1 flex items-center justify-center gap-2 py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors disabled:opacity-70"
            >
              {isSaving ? (
                "Saving..."
              ) : (
                <>
                  <Save className="w-4 h-4" /> Save
                </>
              )}
            </button>
          </div>
        </div>
      </aside>

      {/* Live Preview */}
      <main className="flex-1 overflow-y-auto bg-gray-50 p-8">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm p-8">
          <Renderer user={editedUser} />
        </div>
      </main>
    </div>
  );
}

export default Creator;
