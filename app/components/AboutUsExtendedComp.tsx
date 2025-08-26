export default function AboutUsExtendedComp() {
  const cardData = [
    {
      title: "Who We Are?",
      content:
        "We are a team of innovators, creators, and problem-solvers dedicated to pushing the boundaries of technology and design.",
    },
    {
      title: "Our Story",
      content:
        "Founded with a passion for excellence, our journey began with a simple idea: to build solutions that make a real difference.",
    },
    {
      title: "Our Mission",
      content:
        "To empower our clients by delivering intuitive, powerful, and elegant solutions that drive growth and inspire success.",
    },
  ];

  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 ml-24 lg:px-8 py-12">
        <div className="grid gap-8 md:grid-cols-3">
          {cardData.map((card, index) => (
            <div
              key={index}
              className="bg-transparent border border-gray-500 rounded-lg shadow-lg px-4 py-6 w-80 transform transition-transform duration-300 hover:scale-105"
            >
              <h3 className="text-xl font-semibold mb-4">{card.title}</h3>
              <p className="text-gray-600">{card.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}