const config = {
  segments: [
    {
      id: 1,
      color: "#97CC64",
      text: "Здоров'я",
      level: 5,
      description: "Тут ти можеш оцінити своє фізичне та психічне здоров’я.",
    },
    {
      id: 2,
      color: "#4569BC",
      text: "Кар'єра",
      level: 4,
      description: "Оцінка професійного розвитку та кар'єрних досягнень.",
    },
    {
      id: 3,
      color: "#2A8341",
      text: "Фінанси",
      level: 3,
      description: "Баланс твоїх фінансів та здатність до збережень.",
    },
    {
      id: 4,
      color: "#F68D38",
      text: "Відносини",
      level: 7,
      description: "Якість відносин з близькими, друзями та партнерами.",
    },
    {
      id: 5,
      color: "#EA527F",
      text: "Персональний ріст",
      level: 6,
      description: "Розвиток особистості та самовдосконалення.",
    },
    {
      id: 6,
      color: "#77B6E7",
      text: "Дозвілля",
      level: 2,
      description: "Час для себе, хобі та розваги.",
    },
    {
      id: 7,
      color: "#FFD963",
      text: "Духовність",
      level: 8,
      description: "Зв'язок з духовним світом та внутрішнім спокоєм.",
    },
    {
      id: 8,
      color: "#A955B8",
      text: "Навколишнє середовище",
      level: 5,
      description: "Оцінка стану навколишнього середовища та еко-свідомості.",
    },
  ],
  radius: 200,
  levels: 10,
  fontSize: 15,
};

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

class Wheel {
  constructor(canvas, config) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.config = config;
  }

  draw() {
    const { segments, radius, levels } = this.config;
    const centerX = this.canvas.width / 2;
    const centerY = this.canvas.height / 2;
    const angleStep = (2 * Math.PI) / segments.length;

    segments.forEach((segment, index) => {
      const startAngle = index * angleStep;
      const endAngle = startAngle + angleStep;

      // Segment
      this.ctx.beginPath();
      this.ctx.moveTo(centerX, centerY);
      this.ctx.arc(centerX, centerY, radius, startAngle, endAngle);
      this.ctx.fillStyle = segment.color;
      this.ctx.fill();

      // Level indicator
      const segmentRadius = (segment.level / levels) * radius;
      this.ctx.beginPath();
      this.ctx.moveTo(centerX, centerY);
      this.ctx.arc(centerX, centerY, segmentRadius, startAngle, endAngle);
      this.ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
      this.ctx.fill();

      // Text
      const textAngle = startAngle + angleStep / 2;
      const textX = centerX + Math.cos(textAngle) * (radius + 20);
      const textY = centerY + Math.sin(textAngle) * (radius + 20);
      this.ctx.font = `${this.config.fontSize}px Arial`;
      this.ctx.fillStyle = "#000";
      this.ctx.textAlign = "center";
      this.ctx.fillText(segment.text, textX, textY);
    });
  }

  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  download() {
    const link = document.createElement("a");
    link.download = "balance_wheel.png";
    link.href = this.canvas.toDataURL();
    link.click();
  }
}

const wheel = new Wheel(canvas, config);
wheel.draw();

const accordion = document.getElementById("accordion");

const deleteSegment = (id) => {
  const index = config.segments.findIndex((segment) => segment.id === id);
  if (index !== -1) {
    config.segments.splice(index, 1);
    renderWheelAndAccordion();
  }
};

const createSegmentItem = (segment, index) => {
  const item = document.createElement("div");
  item.className = "accordion-item";

  const header = document.createElement("div");
  header.className = "accordion-header flex justify-between items-center";
  header.innerHTML = `
      <span class="flex-1 text-xl font-bold italic">${segment.text}</span>
      <i class="fa fa-chevron-down"></i>
    `;
  header.addEventListener("click", () => {
    const content = item.querySelector(".accordion-content");
    const icon = header.querySelector("i");
    content.classList.toggle("open");

    icon.classList.toggle("fa-chevron-down");
    icon.classList.toggle("fa-chevron-up");
  });

  const content = document.createElement("div");
  content.className = "accordion-content";
  content.innerHTML = `
      <div class="flex items-center gap-2">
        <label for="slider-${index}" class="flex-1 font-medium text-gray-700">${segment.text} Рівень:</label>
        <input 
          type="range" 
          id="slider-${index}" 
          min="0" 
          max="10" 
          value="${segment.level}" 
          class="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer accent-blue-500 transition focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75" 
        />
        <button 
          class="ml-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 transition" 
          onclick="deleteSegment(${segment.id})"
        >
          Видалити
        </button>
      </div>
      <p class="text-sm text-gray-600 mt-2">${segment.description}</p>
    `;

  content.querySelector("input").addEventListener("input", (e) => {
    segment.level = parseInt(e.target.value);
    wheel.clear();
    wheel.draw();
  });

  item.appendChild(header);
  item.appendChild(content);
  return item;
};


config.segments.forEach((segment, index) => {
  accordion.appendChild(createSegmentItem(segment, index));
});

// Add selected spheres
const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

document
  .getElementById("add-selected-spheres")
  .addEventListener("click", () => {
    const selectedSpheres = document.querySelectorAll(
      "#sphere-list input:checked"
    );
    selectedSpheres.forEach((checkbox) => {
      const sphereText = checkbox.value;
      if (!config.segments.some((segment) => segment.text === sphereText)) {
        const newSegment = {
          id: config.segments.length + 1,
          color: getRandomColor(),
          text: sphereText,
          level: 0,
          description: `Опис для ${sphereText}`,
        };
        config.segments.push(newSegment);
      }
    });
    renderWheelAndAccordion();
  });



  const renderWheelAndAccordion = () => {
    wheel.clear();
    wheel.draw();
    accordion.innerHTML = "";
    config.segments.forEach((segment, index) => {
      accordion.appendChild(createSegmentItem(segment, index));
    });
  };
// Download and clear events
document.getElementById("download").addEventListener("click", () => {
  wheel.download();
});



document.getElementById("clear").addEventListener("click", () => {
  config.segments.forEach((segment) => {
    segment.level = 0;
  });
  renderWheelAndAccordion();
});
