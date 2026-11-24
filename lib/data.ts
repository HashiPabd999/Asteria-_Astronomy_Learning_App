export type Level = "beginner" | "intermediate" | "expert";

export type Block =
  | { type: "text"; title?: string; body: string }
  | { type: "fact"; body: string }
  | { type: "checkpoint"; question: string; options: string[]; answer: number; explanation: string };

export interface Lesson {
  id: string; topic: string; title: string; minutes: number; blocks: Block[];
}
export interface Topic {
  id: string; title: string; blurb: string; level: Level;
}

export const LEVELS: { id: Level; title: string; desc: string }[] = [
  { id: "beginner", title: "Beginner", desc: "New to the night sky. Start with the basics." },
  { id: "intermediate", title: "Intermediate", desc: "Know the basics. Ready for how things work." },
  { id: "expert", title: "Expert", desc: "Comfortable with physics and maths. Go deep." },
];

export const GOALS = [5, 10, 15];

export const TOPICS: Topic[] = [
  { id: "solar-system", title: "Solar System", blurb: "The Sun, planets and the space between.", level: "beginner" },
  { id: "night-sky", title: "Night Sky", blurb: "Find your way around the stars.", level: "beginner" },
  { id: "stars", title: "Stars", blurb: "How stars are born, live and die.", level: "intermediate" },
  { id: "black-holes", title: "Black Holes", blurb: "Gravity so strong light can't leave.", level: "intermediate" },
  { id: "astrophysics", title: "Astrophysics", blurb: "The physics behind the cosmos.", level: "expert" },
];

export const LESSONS: Lesson[] = [
  {
    id: "solar-system-1", topic: "solar-system", title: "Meet the Sun's family", minutes: 5,
    blocks: [
      { type: "text", title: "One star, eight planets", body: "Our solar system is the Sun and everything held by its gravity: eight planets, their moons, dwarf planets, asteroids and comets." },
      { type: "fact", body: "The Sun holds about 99.8% of all the mass in the solar system." },
      { type: "checkpoint", question: "Which is the closest planet to the Sun?", options: ["Venus", "Mercury", "Mars"], answer: 1, explanation: "Mercury orbits the Sun in just 88 Earth days." },
      { type: "text", title: "Rocky and giant", body: "The four inner planets are small and rocky. The four outer planets are giants made mostly of gas and ice." },
      { type: "checkpoint", question: "Which of these is a gas giant?", options: ["Jupiter", "Earth", "Mercury"], answer: 0, explanation: "Jupiter is the largest planet, made mostly of hydrogen and helium." },
    ],
  },
  {
    id: "solar-system-2", topic: "solar-system", title: "Why we have seasons", minutes: 5,
    blocks: [
      { type: "text", title: "It's the tilt", body: "Earth's axis is tilted about 23.5 degrees. As we orbit the Sun, different halves lean toward it, which gives us seasons." },
      { type: "checkpoint", question: "What causes the seasons?", options: ["Distance from the Sun", "Earth's axial tilt", "The Moon's pull"], answer: 1, explanation: "Earth is actually closest to the Sun in January. The tilt is what matters." },
    ],
  },
  {
    id: "night-sky-1", topic: "night-sky", title: "Reading the sky", minutes: 4,
    blocks: [
      { type: "text", title: "Patterns in the dark", body: "Constellations are patterns people drew between bright stars. The stars in them are usually nowhere near each other in space." },
      { type: "checkpoint", question: "Are stars in a constellation close together?", options: ["Yes, always", "No, they only look close from Earth"], answer: 1, explanation: "They sit at very different distances. It is a trick of perspective." },
    ],
  },
  {
    id: "stars-1", topic: "stars", title: "How a star shines", minutes: 6,
    blocks: [
      { type: "text", title: "Fusion", body: "In a star's core, hydrogen nuclei fuse into helium. A tiny amount of mass turns into the energy that we see as light." },
      { type: "checkpoint", question: "What powers a star?", options: ["Burning gas", "Nuclear fusion", "Electric currents"], answer: 1, explanation: "Stars do not burn like a fire. They fuse atoms." },
    ],
  },
  {
    id: "black-holes-1", topic: "black-holes", title: "What is a black hole?", minutes: 6,
    blocks: [
      { type: "text", title: "A point of no return", body: "A black hole is a region where gravity is so strong that nothing, not even light, can escape once it crosses the event horizon." },
      { type: "checkpoint", question: "What is the event horizon?", options: ["The black hole's surface made of rock", "The boundary beyond which nothing escapes"], answer: 1, explanation: "It is a boundary in space, not a solid surface." },
    ],
  },
  {
    id: "astrophysics-1", topic: "astrophysics", title: "Hydrostatic equilibrium", minutes: 7,
    blocks: [
      { type: "text", title: "Pressure versus gravity", body: "A stable star balances inward gravity against outward pressure from fusion. When fuel runs low, the balance breaks and the star evolves." },
      { type: "checkpoint", question: "What opposes gravity in a stable star?", options: ["Outward pressure", "Magnetic fields only", "Rotation only"], answer: 0, explanation: "Thermal and radiation pressure from fusion hold the star up." },
    ],
  },
];

export const lessonsFor = (topicId: string) => LESSONS.filter((l) => l.topic === topicId);
export const getLesson = (id: string) => LESSONS.find((l) => l.id === id);
export const getTopic = (id: string) => TOPICS.find((t) => t.id === id);
