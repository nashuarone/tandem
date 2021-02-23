const ADD_COURSE = "ADD_COURSE";
//const DELETE_COURSE = "DELETE_COURSE";
//const UPDATE_COURSE = "UPDATE_COURSE";

let initialState = {
  coursesData: [
    {
      id: 1,
      tittle: "JavaScript. Уровень 1",
      description: "Данный курс предназначен для тех, кто уже знаком с принципами HTML-вёрстки и созданием статичных страниц. Практические знания и навыки, приобретённые на этом уровне, дают возможность работать и создавать динамические веб-страницы и приложения. Курс систематизирует знания студентов, которые уже сталкивались с JavaScript, но не имеют богатого опыта работы с языком Студенты знакомятся с основами создания интерактивных веб-страниц с помощью языка JavaScript. Полученные на уроках знания закрепляются через практическую часть - реализация игр на языке JavaScript. Перед началом обучения рекомендуется пройти курсы «Основы программирования» и HTML/CSS",
      courseImg:
        "https://st2.depositphotos.com/1350793/8441/i/600/depositphotos_84415820-stock-photo-hand-drawing-online-courses-concept.jpg",
      format: "Онлайн-курс",
      duration: "3 месяца",
      lessionsCount: "Массив уроков, который посчитать и вывести где нужно",
      price: "1000",
      howCompetences: [],
      whatYouGet: [],
      rating: "",
      teachers: [],
      program: [],
      comments: [],
    },
    {
      id: 2,
      tittle: "Test2 Corp edu",
      description:
        "Объяснение текста, начинающегося с «Lorem ipsum dolor sit amet consectetuer», в справке Word. Текст совершенно бессмысленен",
      courseImg:
        "https://myacademy.ru/upload/medialibrary/16c/16cab6a9e1f88c14fbdcf94ff84545e4.jpg",
      format: "Онлайн-курс",
      duration: "1 месяц",
      lessionsCount: "Массив уроков, который посчитать и вывести где нужно",
      price: "1000",
      howCompetences: [],
      whatYouGet: [],
      rating: "",
      teachers: [],
      program: [],
      comments: [],
    },
  ],
  newPostText: "Pupiiiiiiii",
  newNameText: "",
};

const coursesReducer = (state_c = initialState, action) => {
  switch (action.type) {
    case ADD_COURSE: {
      return {
        ...state_c,
        courseData: [ ...action.course ]
      }
    }
    default:
      return state_c;
  }
}

export const addCourse = (course) => ({ type: ADD_COURSE, course });

export default coursesReducer;
