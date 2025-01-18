const config = {
  segments: [
    {
      id: 1,
      color: "#97CC64",
      text: "Здоров'я",
      level: 5,
      description: "Саме від цієї сфери залежать всі інші сфери колеса життєвого балансу. Якщо у людини проблеми зі здоров’ям, і він відчуває якийсь дискомфорт, то інші справи в інших сферах починають сповільнюватися або просідати. Здоров’я включає в себе фізичне, емоційне та психічне благополуччя. Важливо підтримувати здоровий спосіб життя, включаючи правильне харчування, регулярні фізичні вправи, достатній сон та управління стресом.",
    },
    {
      id: 2,
      color: "#4569BC",
      text: "Сім'я",
      level: 7,
      description: "Ця сфера охоплює ваші відносини з родиною, партнером та близькими людьми. Важливо мати здорові та гармонійні відносини, які сприяють вашому емоційному та психологічному благополуччю. Відносини з близькими можуть надавати підтримку, допомогу та натхнення у складних ситуаціях.",
    },
    {
      id: 3,
      color: "#2A8341",
      text: "Саморозвиток",
      level: 6,
      description: "Ця сфера охоплює ваші особисті цілі, мрії та прагнення. Самореалізація - це процес досягнення вашого потенціалу та реалізації ваших талантів і здібностей. Вона включає в себе розвиток навичок, навчання новому, досягнення професійних та особистих цілей.",
    },
    {
      id: 4,
      color: "#F68D38",
      text: "Фінанси",
      level: 3,
      description: "Ця сфера охоплює управління вашими грошима, заощадження, інвестиції та фінансову стабільність. Важливо мати чіткий план щодо управління фінансами, щоб забезпечити собі фінансову безпеку та стабільність. Це включає в себе створення бюджету, планування витрат, заощадження на майбутнє та інвестування.",
    },
    {
      id: 5,
      color: "#EA527F",
      text: `Кар'єра / Бізнес`,
      level: 4,
      description: "Ця сфера охоплює вашу кар'єру, роботу та бізнес-активності. Важливо мати роботу або бізнес, який приносить вам задоволення та відповідає вашим цінностям і цілям. Професійна діяльність також впливає на ваші фінанси, соціальні зв'язки та особистий розвиток.",
    },
    {
      id: 6,
      color: "#77B6E7",
      text: "Духовність",
      level: 5,
      description: "Ця сфера охоплює ваші зусилля щодо самовдосконалення та навчання. Це може бути навчання новим мовам, участь у тренінгах, читання книг, відвідування семінарів або робота з коучем.",
    },
    {
      id: 7,
      color: "#FFD963",
      text: "Відпочинок",
      level: 2,
      description: "Ця сфера охоплює ваші хобі, захоплення, подорожі та будь-які інші активності, які приносять вам радість і задоволення. Відпочинок та подорожі допомагають відновити енергію, знизити рівень стресу та покращити загальне самопочуття.",
    },
    {
      id: 8,
      color: "#A955B8",
      text: "Друзі",
      level: 6,
      description: "Ця сфера охоплює ваші соціальні зв'язки, відносини з друзями та людьми, з якими ви проводите час. Важливо мати здорові та позитивні відносини, які сприяють вашому розвитку та щастю.",
    },
  ],
  radius: 270,
  levels: 10,
  fontSize: 17,
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

      // Малюємо сегмент
      this.ctx.beginPath();
      this.ctx.moveTo(centerX, centerY);
      this.ctx.arc(centerX, centerY, radius, startAngle, endAngle);
      this.ctx.fillStyle = segment.color;
      this.ctx.fill();

      // Малюємо рівень
      const segmentRadius = (segment.level / levels) * radius;
      this.ctx.beginPath();
      this.ctx.moveTo(centerX, centerY);
      this.ctx.arc(centerX, centerY, segmentRadius, startAngle, endAngle);
      this.ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
      this.ctx.fill();

      // Текст
      const textAngle = startAngle + angleStep / 2;
      const textX = centerX + Math.cos(textAngle) * (radius + 20);
      const textY = centerY + Math.sin(textAngle) * (radius + 20);
      const text = segment.text.toUpperCase();
      this.ctx.font = `bold ${this.config.fontSize}px Arial`;
      this.ctx.fillStyle = "#000";
      this.ctx.textAlign = "center";

      // Малюємо бекграунд для тексту
      const textWidth = this.ctx.measureText(text).width;
      const padding = 5;
      this.ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
      this.ctx.fillRect(textX - textWidth / 2 - padding, textY - this.config.fontSize, textWidth + padding * 2, this.config.fontSize + padding);

      // Малюємо текст
      this.ctx.fillStyle = "#000";
      this.ctx.fillText(text, textX, textY);
    });
  }

  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}

const wheel = new Wheel(canvas, config);

const deleteSegment = (id) => {
  const index = config.segments.findIndex((segment) => segment.id === id);
  if (index !== -1) {
    config.segments.splice(index, 1);
    renderWheelAndAccordion();
  }
};

const createSegmentItem = (segment) => {
  const item = document.createElement("div");
  item.className = "accordion-item";

  const header = document.createElement("div");
  header.className = "accordion-header flex justify-between items-center";
  header.innerHTML = `
    <span id="segment-level-${segment.id}" class="flex-1 text-xl font-bold italic">
      ${segment.text} - ${segment.level}
    </span>
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
      <label for="slider-${segment.id}" class="flex-1 font-medium text-gray-700">
        ${segment.text} Рівень:
      </label>
      <input 
        type="range" 
        id="slider-${segment.id}" 
        min="0" 
        max="10" 
        value="${segment.level}" 
        class="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer accent-blue-500 transition focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75" 
      />
    </div>
    <p class="text-sm text-gray-600 mt-2">${segment.description}</p>
  `;

  const slider = content.querySelector("input");
  slider.addEventListener("input", (e) => {
    segment.level = parseInt(e.target.value);
    const levelDisplay = document.getElementById(`segment-level-${segment.id}`);
    if (levelDisplay) {
      levelDisplay.textContent = `${segment.text} - ${segment.level}`;
    }
    wheel.clear();
    wheel.draw();
  });

  item.appendChild(header);
  item.appendChild(content);
  return item;
};

const renderWheelAndAccordion = () => {
  wheel.clear();
  wheel.draw();
  const accordion = document.getElementById("accordion");
  accordion.innerHTML = "";
  config.segments.forEach((segment) => {
    accordion.appendChild(createSegmentItem(segment));
  });
};



document.getElementById('download').addEventListener('click', function() {
  const link = document.createElement('a');
  link.href = canvas.toDataURL('image/png');
  link.download = 'wheel.png';
  link.click();
});



renderWheelAndAccordion();