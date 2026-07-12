"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  Save, 
  LogOut, 
  Plus, 
  Trash2, 
  ChevronUp, 
  ChevronDown, 
  Check, 
  AlertCircle, 
  User, 
  Briefcase, 
  FolderGit2, 
  Award, 
  Wrench,
  Loader2
} from "lucide-react";
import { PortfolioContent, ExperienceItem, Project, AchievementItem, TechCardItem } from "@/lib/types";
import { saveContent, logout } from "./actions";

export function AdminDashboard({ initialContent }: { initialContent: PortfolioContent }) {
  const [content, setContent] = useState<PortfolioContent>(initialContent);
  const [activeTab, setActiveTab] = useState<"profile" | "skills" | "experience" | "projects" | "achievements">("profile");
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push("/admin/login");
    router.refresh();
  };

  const handleSave = async () => {
    setSaveStatus("saving");
    setErrorMsg("");
    try {
      const res = await saveContent(content);
      if (res.success) {
        setSaveStatus("success");
        setTimeout(() => setSaveStatus("idle"), 3000);
      } else {
        setSaveStatus("error");
        setErrorMsg(res.error || "Failed to save content");
      }
    } catch (err) {
      setSaveStatus("error");
      setErrorMsg("An unexpected error occurred while saving.");
    }
  };

  // Type-safe field updates
  const updateProfileField = (key: string, value: any) => {
    setContent((prev) => ({
      ...prev,
      profile: {
        ...prev.profile,
        [key]: value,
      },
    }));
  };

  const updateSocialField = (key: string, value: string) => {
    setContent((prev) => ({
      ...prev,
      profile: {
        ...prev.profile,
        socials: {
          ...prev.profile.socials,
          [key]: value,
        },
      },
    }));
  };

  // ABOUT ME TAGS
  const handleAboutTagChange = (index: number, value: string) => {
    const updated = [...content.aboutTags];
    updated[index] = value;
    setContent((prev) => ({ ...prev, aboutTags: updated }));
  };

  const addAboutTag = () => {
    setContent((prev) => ({ ...prev, aboutTags: [...prev.aboutTags, "New Tag"] }));
  };

  const removeAboutTag = (index: number) => {
    setContent((prev) => ({
      ...prev,
      aboutTags: prev.aboutTags.filter((_, i) => i !== index),
    }));
  };

  // SKILLS GROUPS (techCards)
  const handleTechCardTitleChange = (index: number, title: string) => {
    const updated = [...content.techCards];
    updated[index] = { ...updated[index], title };
    setContent((prev) => ({ ...prev, techCards: updated }));
  };

  const handleTechSkillChange = (cardIndex: number, skillIndex: number, value: string) => {
    const updated = [...content.techCards];
    const skills = [...updated[cardIndex].skills];
    skills[skillIndex] = value;
    updated[cardIndex] = { ...updated[cardIndex], skills };
    setContent((prev) => ({ ...prev, techCards: updated }));
  };

  const addTechSkill = (cardIndex: number) => {
    const updated = [...content.techCards];
    updated[cardIndex] = {
      ...updated[cardIndex],
      skills: [...updated[cardIndex].skills, "New Skill"],
    };
    setContent((prev) => ({ ...prev, techCards: updated }));
  };

  const removeTechSkill = (cardIndex: number, skillIndex: number) => {
    const updated = [...content.techCards];
    updated[cardIndex] = {
      ...updated[cardIndex],
      skills: updated[cardIndex].skills.filter((_, i) => i !== skillIndex),
    };
    setContent((prev) => ({ ...prev, techCards: updated }));
  };

  const addTechCard = () => {
    const newCard: TechCardItem = { title: "New Group", skills: ["Skill 1"] };
    setContent((prev) => ({ ...prev, techCards: [...prev.techCards, newCard] }));
  };

  const removeTechCard = (index: number) => {
    setContent((prev) => ({
      ...prev,
      techCards: prev.techCards.filter((_, i) => i !== index),
    }));
  };

  // EXPERIENCE
  const updateExperienceField = (index: number, key: keyof ExperienceItem, value: any) => {
    const updated = [...content.experience];
    updated[index] = { ...updated[index], [key]: value };
    setContent((prev) => ({ ...prev, experience: updated }));
  };

  const handleExpPointChange = (expIndex: number, pointIndex: number, value: string) => {
    const updated = [...content.experience];
    const points = [...updated[expIndex].points];
    points[pointIndex] = value;
    updated[expIndex] = { ...updated[expIndex], points };
    setContent((prev) => ({ ...prev, experience: updated }));
  };

  const addExpPoint = (expIndex: number) => {
    const updated = [...content.experience];
    updated[expIndex] = {
      ...updated[expIndex],
      points: [...updated[expIndex].points, "New detail point"],
    };
    setContent((prev) => ({ ...prev, experience: updated }));
  };

  const removeExpPoint = (expIndex: number, pointIndex: number) => {
    const updated = [...content.experience];
    updated[expIndex] = {
      ...updated[expIndex],
      points: updated[expIndex].points.filter((_, i) => i !== pointIndex),
    };
    setContent((prev) => ({ ...prev, experience: updated }));
  };

  const addExperience = () => {
    const newItem: ExperienceItem = {
      role: "New Role",
      org: "Organization Name",
      period: "Period (e.g. Month Year - Present)",
      mode: "Location/CGPA Mode",
      icon: "briefcase",
      points: ["Core responsibility 1"],
    };
    setContent((prev) => ({ ...prev, experience: [...prev.experience, newItem] }));
  };

  const removeExperience = (index: number) => {
    setContent((prev) => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== index),
    }));
  };

  // EDUCATION (Mapped inside Experience tab / handled identically)
  const updateEducationField = (index: number, key: string, value: any) => {
    const updated = [...content.education];
    updated[index] = { ...updated[index], [key]: value };
    setContent((prev) => ({ ...prev, education: updated }));
  };

  const addEducation = () => {
    setContent((prev) => ({
      ...prev,
      education: [
        ...prev.education,
        {
          degree: "Degree / Course",
          org: "Institution",
          period: "Graduated Year",
          mode: "CGPA/Score Mode",
          icon: "grad",
          points: ["Details"],
        },
      ],
    }));
  };

  const removeEducation = (index: number) => {
    setContent((prev) => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index),
    }));
  };

  // PROJECTS
  const updateProjectField = (index: number, key: keyof Project, value: any) => {
    const updated = [...content.projects];
    updated[index] = { ...updated[index], [key]: value };
    setContent((prev) => ({ ...prev, projects: updated }));
  };

  const handleProjBadgeChange = (projIndex: number, badgeIndex: number, value: string) => {
    const updated = [...content.projects];
    const badges = [...(updated[projIndex].badges || [])];
    badges[badgeIndex] = value;
    updated[projIndex] = { ...updated[projIndex], badges };
    setContent((prev) => ({ ...prev, projects: updated }));
  };

  const addProjBadge = (projIndex: number) => {
    const updated = [...content.projects];
    const badges = [...(updated[projIndex].badges || []), "New Tag"];
    updated[projIndex] = { ...updated[projIndex], badges };
    setContent((prev) => ({ ...prev, projects: updated }));
  };

  const removeProjBadge = (projIndex: number, badgeIndex: number) => {
    const updated = [...content.projects];
    updated[projIndex] = {
      ...updated[projIndex],
      badges: (updated[projIndex].badges || []).filter((_, i) => i !== badgeIndex),
    };
    setContent((prev) => ({ ...prev, projects: updated }));
  };

  const handleProjTechIconChange = (projIndex: number, iconIndex: number, value: any) => {
    const updated = [...content.projects];
    const techIcons = [...updated[projIndex].techIcons];
    techIcons[iconIndex] = value;
    updated[projIndex] = { ...updated[projIndex], techIcons };
    setContent((prev) => ({ ...prev, projects: updated }));
  };

  const addProjTechIcon = (projIndex: number) => {
    const updated = [...content.projects];
    updated[projIndex] = {
      ...updated[projIndex],
      techIcons: [...updated[projIndex].techIcons, "excel"],
    };
    setContent((prev) => ({ ...prev, projects: updated }));
  };

  const removeProjTechIcon = (projIndex: number, iconIndex: number) => {
    const updated = [...content.projects];
    updated[projIndex] = {
      ...updated[projIndex],
      techIcons: updated[projIndex].techIcons.filter((_, i) => i !== iconIndex),
    };
    setContent((prev) => ({ ...prev, projects: updated }));
  };

  const addProject = () => {
    const newItem: Project = {
      title: "New Project Title",
      description: "Brief overview of what the project is.",
      impact: "Measurable outcome or impact.",
      categories: ["All"],
      techIcons: ["excel"],
      badges: ["Independent Research"],
    };
    setContent((prev) => ({ ...prev, projects: [...prev.projects, newItem] }));
  };

  const removeProject = (index: number) => {
    setContent((prev) => ({
      ...prev,
      projects: prev.projects.filter((_, i) => i !== index),
    }));
  };

  // CERTIFICATIONS & ACHIEVEMENTS
  const updateAchievementField = (index: number, key: keyof AchievementItem, value: string) => {
    const updated = [...content.achievements];
    updated[index] = { ...updated[index], [key]: value };
    setContent((prev) => ({ ...prev, achievements: updated }));
  };

  const addAchievement = () => {
    const newItem: AchievementItem = {
      label: "📈 New Achievement Title",
      detail: "Details / Credentials info here",
    };
    setContent((prev) => ({ ...prev, achievements: [...prev.achievements, newItem] }));
  };

  const removeAchievement = (index: number) => {
    setContent((prev) => ({
      ...prev,
      achievements: prev.achievements.filter((_, i) => i !== index),
    }));
  };

  // UTILS
  const moveItem = (listKey: "experience" | "education" | "projects" | "achievements", index: number, direction: "up" | "down") => {
    const list = [...content[listKey]] as any[];
    if (direction === "up" && index === 0) return;
    if (direction === "down" && index === list.length - 1) return;

    const targetIndex = direction === "up" ? index - 1 : index + 1;
    const temp = list[index];
    list[index] = list[targetIndex];
    list[targetIndex] = temp;

    setContent((prev) => ({ ...prev, [listKey]: list }));
  };

  return (
    <div className="min-h-screen dark:bg-[#0E0E10] bg-[#FAFAFA] transition-colors duration-500 text-gray-900 dark:text-gray-100 flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b dark:border-white/10 border-black/10 backdrop-blur-md dark:bg-[#0E0E10]/80 bg-white/80 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <span className="p-2 rounded-lg bg-red-500/10 text-red-500">
              <User className="w-5 h-5" />
            </span>
            <div>
              <h1 className="text-lg font-bold tracking-wide dark:text-white text-gray-900 leading-none">
                Admin Panel
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Edit portfolio content dynamically
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleSave}
              disabled={saveStatus === "saving"}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full dark:bg-white dark:text-black bg-black text-white hover:bg-black/90 dark:hover:bg-white/90 disabled:opacity-50 disabled:cursor-not-allowed font-semibold text-sm transition-all duration-200"
            >
              {saveStatus === "saving" ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Saving...
                </>
              ) : saveStatus === "success" ? (
                <>
                  <Check className="w-4 h-4" />
                  Saved!
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Save Changes
                </>
              )}
            </button>

            <button
              onClick={handleLogout}
              className="p-2.5 rounded-full border dark:border-white/10 border-black/10 dark:hover:bg-white/5 hover:bg-black/5 text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-all duration-200"
              title="Sign Out"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Main layout */}
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 flex-1 flex flex-col md:flex-row gap-8 w-full">
        {/* Sidebar Tabs */}
        <aside className="w-full md:w-64 shrink-0 space-y-1">
          <nav className="flex flex-row md:flex-col overflow-x-auto md:overflow-visible gap-1 pb-3 md:pb-0 no-scrollbar">
            {[
              { id: "profile", label: "Profile Info", icon: User },
              { id: "skills", label: "Skills & Tags", icon: Wrench },
              { id: "experience", label: "Experience & Edu", icon: Briefcase },
              { id: "projects", label: "Projects list", icon: FolderGit2 },
              { id: "achievements", label: "Achievements", icon: Award },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 whitespace-nowrap md:w-full
                    ${
                      isActive
                        ? "dark:bg-white/10 dark:text-white bg-black/5 text-black border-l-2 border-red-500"
                        : "text-gray-500 dark:text-gray-400 dark:hover:bg-white/5 hover:bg-black/5"
                    }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-red-500" : ""}`} />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Form container */}
        <main className="flex-1 min-w-0">
          {saveStatus === "error" && (
            <div className="mb-6 flex items-start gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-sm">
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold">Error:</span> {errorMsg}
              </div>
            </div>
          )}

          {saveStatus === "success" && (
            <div className="mb-6 flex items-start gap-3 p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-400 text-sm">
              <Check className="w-5 h-5 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold">Success:</span> Portfolio updated successfully! Changes are live.
              </div>
            </div>
          )}

          <div className="p-6 sm:p-8 rounded-2xl border dark:bg-[#0B0B0C] dark:border-white/5 bg-white border-black/5 shadow-md">
            {/* TABS EDITORS */}
            
            {/* PROFILE TAB */}
            {activeTab === "profile" && (
              <div className="space-y-6">
                <h3 className="text-lg font-bold border-b dark:border-white/10 border-black/10 pb-3">
                  Profile Details
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Full Name</label>
                    <input
                      type="text"
                      value={content.profile.name}
                      onChange={(e) => updateProfileField("name", e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border bg-transparent text-sm focus:outline-none dark:border-white/10 dark:text-white border-black/10 text-black focus:border-red-500/50"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Title / Headline</label>
                    <input
                      type="text"
                      value={content.profile.title}
                      onChange={(e) => updateProfileField("title", e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border bg-transparent text-sm focus:outline-none dark:border-white/10 dark:text-white border-black/10 text-black focus:border-red-500/50"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Location</label>
                    <input
                      type="text"
                      value={content.profile.location}
                      onChange={(e) => updateProfileField("location", e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border bg-transparent text-sm focus:outline-none dark:border-white/10 dark:text-white border-black/10 text-black focus:border-red-500/50"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Flag Emoji</label>
                    <input
                      type="text"
                      value={content.profile.flag}
                      onChange={(e) => updateProfileField("flag", e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border bg-transparent text-sm focus:outline-none dark:border-white/10 dark:text-white border-black/10 text-black focus:border-red-500/50"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Availability Badge</label>
                    <input
                      type="text"
                      value={content.profile.available}
                      onChange={(e) => updateProfileField("available", e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border bg-transparent text-sm focus:outline-none dark:border-white/10 dark:text-white border-black/10 text-black focus:border-red-500/50"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Email Address</label>
                    <input
                      type="email"
                      value={content.profile.email}
                      onChange={(e) => updateProfileField("email", e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border bg-transparent text-sm focus:outline-none dark:border-white/10 dark:text-white border-black/10 text-black focus:border-red-500/50"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Resume PDF URL</label>
                    <input
                      type="text"
                      value={content.profile.resume}
                      onChange={(e) => updateProfileField("resume", e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border bg-transparent text-sm focus:outline-none dark:border-white/10 dark:text-white border-black/10 text-black focus:border-red-500/50"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">LinkedIn URL</label>
                    <input
                      type="text"
                      value={content.profile.socials.linkedin}
                      onChange={(e) => updateSocialField("linkedin", e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border bg-transparent text-sm focus:outline-none dark:border-white/10 dark:text-white border-black/10 text-black focus:border-red-500/50"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Brief Intro / Tagline</label>
                  <textarea
                    value={content.profile.tagline}
                    onChange={(e) => updateProfileField("tagline", e.target.value)}
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl border bg-transparent text-sm focus:outline-none resize-none dark:border-white/10 dark:text-white border-black/10 text-black focus:border-red-500/50"
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">About Me Paragraphs</label>
                    <button
                      type="button"
                      onClick={() => {
                        const paras = content.profile.aboutParagraphs || [];
                        updateProfileField("aboutParagraphs", [...paras, "New Paragraph"]);
                      }}
                      className="text-xs text-red-500 hover:text-red-400 flex items-center gap-0.5 font-semibold"
                    >
                      <Plus className="w-3 h-3 mr-1" /> Add Paragraph
                    </button>
                  </div>

                  <div className="space-y-3">
                    {(content.profile.aboutParagraphs || []).map((para, pi) => (
                      <div key={pi} className="flex items-start gap-2">
                        <textarea
                          value={para}
                          onChange={(e) => {
                            const paras = [...(content.profile.aboutParagraphs || [])];
                            paras[pi] = e.target.value;
                            updateProfileField("aboutParagraphs", paras);
                          }}
                          rows={3}
                          className="w-full px-4 py-3 rounded-xl border bg-transparent text-sm focus:outline-none resize-none dark:border-white/10 dark:text-white border-black/10 text-black focus:border-red-500/50"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const paras = (content.profile.aboutParagraphs || []).filter((_, idx) => idx !== pi);
                            updateProfileField("aboutParagraphs", paras);
                          }}
                          className="text-red-500 hover:text-red-400 mt-2 shrink-0"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* SKILLS TAB */}
            {activeTab === "skills" && (
              <div className="space-y-8">
                {/* About Tags */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b dark:border-white/10 border-black/10 pb-3">
                    <h3 className="text-lg font-bold">About Me Tags</h3>
                    <button
                      onClick={addAboutTag}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold dark:bg-white/10 bg-black/5 hover:opacity-85 transition-opacity"
                    >
                      <Plus className="w-3.5 h-3.5" /> Add Tag
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {content.aboutTags.map((tag, i) => (
                      <div key={i} className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-dashed dark:border-white/10 border-black/10">
                        <input
                          type="text"
                          value={tag}
                          onChange={(e) => handleAboutTagChange(i, e.target.value)}
                          className="bg-transparent text-xs font-medium focus:outline-none focus:underline w-24 text-center"
                        />
                        <button
                          onClick={() => removeAboutTag(i)}
                          className="text-red-500 hover:text-red-400 transition-colors"
                          title="Remove Tag"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tech Cards */}
                <div className="space-y-6">
                  <div className="flex justify-between items-center border-b dark:border-white/10 border-black/10 pb-3">
                    <h3 className="text-lg font-bold">Skills Competency Groups</h3>
                    <button
                      onClick={addTechCard}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold dark:bg-white/10 bg-black/5 hover:opacity-85 transition-opacity"
                    >
                      <Plus className="w-3.5 h-3.5" /> Add Group
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {content.techCards.map((card, ci) => (
                      <div key={ci} className="p-5 rounded-xl border dark:border-white/5 border-black/5 dark:bg-white/5 bg-black/5 space-y-4">
                        <div className="flex justify-between items-center gap-3">
                          <input
                            type="text"
                            value={card.title}
                            onChange={(e) => handleTechCardTitleChange(ci, e.target.value)}
                            className="bg-transparent font-bold text-sm focus:outline-none border-b border-transparent focus:border-red-500/50 uppercase tracking-wider w-full"
                          />
                          <button
                            onClick={() => removeTechCard(ci)}
                            className="text-red-500 hover:text-red-400 transition-colors shrink-0"
                            title="Remove Group"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-gray-500">Skills / Keywords</span>
                            <button
                              onClick={() => addTechSkill(ci)}
                              className="text-xs text-red-500 hover:text-red-400 flex items-center gap-0.5 font-semibold"
                            >
                              <Plus className="w-3 h-3" /> Add Skill
                            </button>
                          </div>
                          
                          <div className="space-y-2">
                            {card.skills.map((skill, si) => (
                              <div key={si} className="flex items-center gap-2">
                                <input
                                  type="text"
                                  value={skill}
                                  onChange={(e) => handleTechSkillChange(ci, si, e.target.value)}
                                  className="w-full px-3 py-1.5 rounded-lg border text-xs bg-transparent dark:border-white/10 border-black/10 focus:outline-none"
                                />
                                <button
                                  onClick={() => removeTechSkill(ci, si)}
                                  className="text-red-500 hover:text-red-400"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* EXPERIENCE & EDUCATION TAB */}
            {activeTab === "experience" && (
              <div className="space-y-12">
                {/* Work Experience */}
                <div className="space-y-6">
                  <div className="flex justify-between items-center border-b dark:border-white/10 border-black/10 pb-3">
                    <h3 className="text-lg font-bold flex items-center gap-2">
                      <Briefcase className="w-5 h-5 text-red-500" />
                      Work Experience
                    </h3>
                    <button
                      onClick={addExperience}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold dark:bg-white/10 bg-black/5 hover:opacity-85 transition-opacity"
                    >
                      <Plus className="w-3.5 h-3.5" /> Add Experience
                    </button>
                  </div>

                  <div className="space-y-8">
                    {content.experience.map((exp, i) => (
                      <div key={i} className="p-6 rounded-xl border dark:border-white/5 border-black/5 dark:bg-white/5 bg-black/5 space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-xs bg-red-500/10 text-red-500 px-2 py-0.5 rounded font-bold">
                            Job #{i + 1}
                          </span>
                          
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => moveItem("experience", i, "up")}
                              disabled={i === 0}
                              className="p-1 rounded hover:bg-black/10 dark:hover:bg-white/10 disabled:opacity-30"
                            >
                              <ChevronUp className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => moveItem("experience", i, "down")}
                              disabled={i === content.experience.length - 1}
                              className="p-1 rounded hover:bg-black/10 dark:hover:bg-white/10 disabled:opacity-30"
                            >
                              <ChevronDown className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => removeExperience(i)}
                              className="text-red-500 hover:text-red-400 p-1"
                              title="Delete Job"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label className="text-xs text-gray-500">Role / Job Title</label>
                            <input
                              type="text"
                              value={exp.role}
                              onChange={(e) => updateExperienceField(i, "role", e.target.value)}
                              className="w-full px-3 py-2 rounded-lg border text-sm bg-transparent dark:border-white/10 border-black/10 focus:outline-none"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="text-xs text-gray-500">Organization Name</label>
                            <input
                              type="text"
                              value={exp.org}
                              onChange={(e) => updateExperienceField(i, "org", e.target.value)}
                              className="w-full px-3 py-2 rounded-lg border text-sm bg-transparent dark:border-white/10 border-black/10 focus:outline-none"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="text-xs text-gray-500">Duration (Period)</label>
                            <input
                              type="text"
                              value={exp.period}
                              onChange={(e) => updateExperienceField(i, "period", e.target.value)}
                              className="w-full px-3 py-2 rounded-lg border text-sm bg-transparent dark:border-white/10 border-black/10 focus:outline-none"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="text-xs text-gray-500">Mode (e.g. Onsite / Remote)</label>
                            <input
                              type="text"
                              value={exp.mode}
                              onChange={(e) => updateExperienceField(i, "mode", e.target.value)}
                              className="w-full px-3 py-2 rounded-lg border text-sm bg-transparent dark:border-white/10 border-black/10 focus:outline-none"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <label className="text-xs text-gray-500 font-semibold">Responsibility Points</label>
                            <button
                              onClick={() => addExpPoint(i)}
                              className="text-xs text-red-500 hover:text-red-400 flex items-center gap-0.5"
                            >
                              <Plus className="w-3 h-3" /> Add Point
                            </button>
                          </div>

                          <div className="space-y-2">
                            {exp.points.map((point, pi) => (
                              <div key={pi} className="flex items-start gap-2">
                                <textarea
                                  value={point}
                                  onChange={(e) => handleExpPointChange(i, pi, e.target.value)}
                                  rows={2}
                                  className="w-full px-3 py-2 rounded-lg border text-xs bg-transparent dark:border-white/10 border-black/10 focus:outline-none resize-none"
                                />
                                <button
                                  onClick={() => removeExpPoint(i, pi)}
                                  className="text-red-500 hover:text-red-400 mt-1 shrink-0"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Education */}
                <div className="space-y-6">
                  <div className="flex justify-between items-center border-b dark:border-white/10 border-black/10 pb-3">
                    <h3 className="text-lg font-bold flex items-center gap-2">
                      <Award className="w-5 h-5 text-red-500" />
                      Education History
                    </h3>
                    <button
                      onClick={addEducation}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold dark:bg-white/10 bg-black/5 hover:opacity-85 transition-opacity"
                    >
                      <Plus className="w-3.5 h-3.5" /> Add Education
                    </button>
                  </div>

                  <div className="space-y-8">
                    {content.education.map((edu, i) => (
                      <div key={i} className="p-6 rounded-xl border dark:border-white/5 border-black/5 dark:bg-white/5 bg-black/5 space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-xs bg-red-500/10 text-red-500 px-2 py-0.5 rounded font-bold">
                            Education #{i + 1}
                          </span>

                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => moveItem("education", i, "up")}
                              disabled={i === 0}
                              className="p-1 rounded hover:bg-black/10 dark:hover:bg-white/10 disabled:opacity-30"
                            >
                              <ChevronUp className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => moveItem("education", i, "down")}
                              disabled={i === content.education.length - 1}
                              className="p-1 rounded hover:bg-black/10 dark:hover:bg-white/10 disabled:opacity-30"
                            >
                              <ChevronDown className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => removeEducation(i)}
                              className="text-red-500 hover:text-red-400 p-1"
                              title="Delete Item"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label className="text-xs text-gray-500">Degree / Qualification</label>
                            <input
                              type="text"
                              value={edu.degree}
                              onChange={(e) => updateEducationField(i, "degree", e.target.value)}
                              className="w-full px-3 py-2 rounded-lg border text-sm bg-transparent dark:border-white/10 border-black/10 focus:outline-none"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="text-xs text-gray-500">Institution Name</label>
                            <input
                              type="text"
                              value={edu.org}
                              onChange={(e) => updateEducationField(i, "org", e.target.value)}
                              className="w-full px-3 py-2 rounded-lg border text-sm bg-transparent dark:border-white/10 border-black/10 focus:outline-none"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="text-xs text-gray-500">Duration (Period)</label>
                            <input
                              type="text"
                              value={edu.period}
                              onChange={(e) => updateEducationField(i, "period", e.target.value)}
                              className="w-full px-3 py-2 rounded-lg border text-sm bg-transparent dark:border-white/10 border-black/10 focus:outline-none"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="text-xs text-gray-500">Score / CGPA</label>
                            <input
                              type="text"
                              value={edu.mode}
                              onChange={(e) => updateEducationField(i, "mode", e.target.value)}
                              className="w-full px-3 py-2 rounded-lg border text-sm bg-transparent dark:border-white/10 border-black/10 focus:outline-none"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* PROJECTS TAB */}
            {activeTab === "projects" && (
              <div className="space-y-6">
                <div className="flex justify-between items-center border-b dark:border-white/10 border-black/10 pb-3">
                  <h3 className="text-lg font-bold flex items-center gap-2">
                    <FolderGit2 className="w-5 h-5 text-red-500" />
                    Projects List
                  </h3>
                  <button
                    onClick={addProject}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold dark:bg-white/10 bg-black/5 hover:opacity-85 transition-opacity"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Project
                  </button>
                </div>

                <div className="space-y-8">
                  {content.projects.map((proj, i) => (
                    <div key={i} className="p-6 rounded-xl border dark:border-white/5 border-black/5 dark:bg-white/5 bg-black/5 space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-xs bg-red-500/10 text-red-500 px-2 py-0.5 rounded font-bold">
                          Project #{i + 1}
                        </span>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => moveItem("projects", i, "up")}
                            disabled={i === 0}
                            className="p-1 rounded hover:bg-black/10 dark:hover:bg-white/10 disabled:opacity-30"
                          >
                            <ChevronUp className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => moveItem("projects", i, "down")}
                            disabled={i === content.projects.length - 1}
                            className="p-1 rounded hover:bg-black/10 dark:hover:bg-white/10 disabled:opacity-30"
                          >
                            <ChevronDown className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => removeProject(i)}
                            className="text-red-500 hover:text-red-400 p-1"
                            title="Delete Project"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-xs text-gray-500">Project Title</label>
                          <input
                            type="text"
                            value={proj.title}
                            onChange={(e) => updateProjectField(i, "title", e.target.value)}
                            className="w-full px-3 py-2 rounded-lg border text-sm bg-transparent dark:border-white/10 border-black/10 focus:outline-none"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-xs text-gray-500">Impact Statement</label>
                          <input
                            type="text"
                            value={proj.impact}
                            onChange={(e) => updateProjectField(i, "impact", e.target.value)}
                            className="w-full px-3 py-2 rounded-lg border text-sm bg-transparent dark:border-white/10 border-black/10 focus:outline-none"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-xs text-gray-500">GitHub Link (Optional)</label>
                          <input
                            type="text"
                            value={proj.github || ""}
                            onChange={(e) => updateProjectField(i, "github", e.target.value)}
                            className="w-full px-3 py-2 rounded-lg border text-sm bg-transparent dark:border-white/10 border-black/10 focus:outline-none"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-xs text-gray-500">External Live Link (Optional)</label>
                          <input
                            type="text"
                            value={proj.external || ""}
                            onChange={(e) => updateProjectField(i, "external", e.target.value)}
                            className="w-full px-3 py-2 rounded-lg border text-sm bg-transparent dark:border-white/10 border-black/10 focus:outline-none"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-xs text-gray-500">Categories (comma separated)</label>
                          <input
                            type="text"
                            value={proj.categories.join(", ")}
                            onChange={(e) =>
                              updateProjectField(
                                i,
                                "categories",
                                e.target.value.split(",").map((s) => s.trim())
                              )
                            }
                            className="w-full px-3 py-2 rounded-lg border text-sm bg-transparent dark:border-white/10 border-black/10 focus:outline-none"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-xs text-gray-500">Project Cover Image Path (Optional)</label>
                          <input
                            type="text"
                            value={proj.image || ""}
                            onChange={(e) => updateProjectField(i, "image", e.target.value)}
                            className="w-full px-3 py-2 rounded-lg border text-sm bg-transparent dark:border-white/10 border-black/10 focus:outline-none"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs text-gray-500">Description</label>
                        <textarea
                          value={proj.description}
                          onChange={(e) => updateProjectField(i, "description", e.target.value)}
                          rows={3}
                          className="w-full px-3 py-2 rounded-lg border text-sm bg-transparent dark:border-white/10 border-black/10 focus:outline-none resize-none"
                        />
                      </div>

                      {/* Tech icons and badges editing */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                        {/* Tech Icons list */}
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <label className="text-xs font-semibold text-gray-500">Tech Icons (keys)</label>
                            <button
                              onClick={() => addProjTechIcon(i)}
                              className="text-xs text-red-500 hover:text-red-400 flex items-center gap-0.5"
                            >
                              <Plus className="w-3 h-3" /> Add Icon
                            </button>
                          </div>
                          
                          <div className="space-y-2">
                            {proj.techIcons.map((icon, iconIdx) => (
                              <div key={iconIdx} className="flex items-center gap-2">
                                <select
                                  value={icon}
                                  onChange={(e) => handleProjTechIconChange(i, iconIdx, e.target.value)}
                                  className="w-full px-3 py-1.5 rounded-lg border text-xs bg-transparent dark:bg-[#0B0B0C] dark:border-white/10 border-black/10 focus:outline-none"
                                >
                                  {["excel", "powerpoint", "python", "tally", "powerbi", "sql", "valuation", "modeling", "banking", "reports", "analytics", "rupee"].map((key) => (
                                    <option key={key} value={key} className="dark:bg-[#0E0E10]">
                                      {key}
                                    </option>
                                  ))}
                                </select>
                                <button
                                  onClick={() => removeProjTechIcon(i, iconIdx)}
                                  className="text-red-500 hover:text-red-400"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Badges list */}
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <label className="text-xs font-semibold text-gray-500">Badges</label>
                            <button
                              onClick={() => addProjBadge(i)}
                              className="text-xs text-red-500 hover:text-red-400 flex items-center gap-0.5"
                            >
                              <Plus className="w-3 h-3" /> Add Badge
                            </button>
                          </div>

                          <div className="space-y-2">
                            {(proj.badges || []).map((badge, bIdx) => (
                              <div key={bIdx} className="flex items-center gap-2">
                                <input
                                  type="text"
                                  value={badge}
                                  onChange={(e) => handleProjBadgeChange(i, bIdx, e.target.value)}
                                  className="w-full px-3 py-1.5 rounded-lg border text-xs bg-transparent dark:border-white/10 border-black/10 focus:outline-none"
                                />
                                <button
                                  onClick={() => removeProjBadge(i, bIdx)}
                                  className="text-red-500 hover:text-red-400"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ACHIEVEMENTS TAB */}
            {activeTab === "achievements" && (
              <div className="space-y-6">
                <div className="flex justify-between items-center border-b dark:border-white/10 border-black/10 pb-3">
                  <h3 className="text-lg font-bold flex items-center gap-2">
                    <Award className="w-5 h-5 text-red-500" />
                    Achievements & Certifications
                  </h3>
                  <button
                    onClick={addAchievement}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold dark:bg-white/10 bg-black/5 hover:opacity-85 transition-opacity"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Achievement
                  </button>
                </div>

                <div className="space-y-6">
                  {content.achievements.map((ach, i) => (
                    <div key={i} className="p-5 rounded-xl border dark:border-white/5 border-black/5 dark:bg-white/5 bg-black/5 space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-xs bg-red-500/10 text-red-500 px-2 py-0.5 rounded font-bold">
                          Achievement #{i + 1}
                        </span>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => moveItem("achievements", i, "up")}
                            disabled={i === 0}
                            className="p-1 rounded hover:bg-black/10 dark:hover:bg-white/10 disabled:opacity-30"
                          >
                            <ChevronUp className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => moveItem("achievements", i, "down")}
                            disabled={i === content.achievements.length - 1}
                            className="p-1 rounded hover:bg-black/10 dark:hover:bg-white/10 disabled:opacity-30"
                          >
                            <ChevronDown className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => removeAchievement(i)}
                            className="text-red-500 hover:text-red-400 p-1"
                            title="Delete Item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="space-y-1">
                          <label className="text-xs text-gray-500">Label (Title with Emoji)</label>
                          <input
                            type="text"
                            value={ach.label}
                            onChange={(e) => updateAchievementField(i, "label", e.target.value)}
                            className="w-full px-3 py-2 rounded-lg border text-sm bg-transparent dark:border-white/10 border-black/10 focus:outline-none"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-xs text-gray-500">Detail / Organization Credential Description</label>
                          <input
                            type="text"
                            value={ach.detail}
                            onChange={(e) => updateAchievementField(i, "detail", e.target.value)}
                            className="w-full px-3 py-2 rounded-lg border text-sm bg-transparent dark:border-white/10 border-black/10 focus:outline-none"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
