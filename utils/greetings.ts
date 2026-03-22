export function getGreetingAndDate() {
  const now = new Date();

  const hour = now.getHours();
  let greeting = "Good Evening,";
  if (hour < 12) greeting = "Good Morning,";
  else if (hour < 18) greeting = "Good Afternoon,";

  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const day = daysOfWeek[now.getDay()];

  const formatted = now.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  return {
    greeting,
    date: `${day}, ${formatted}`,
  };
}

// export function greet(): string {
//     const now = new Date();
//     const hour = now.getHours();

//     if (hour < 12) {
//         return "Good Morning,";
//     } else if (hour < 18) {
//         return "Good Afternoon,";
//     } else {
//         return "Good Evening,";
//     }
// }

// export function date(): string {
//     const now = new Date();
//     const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
//     const day = daysOfWeek[now.getDay()];

//     const options: Intl.DateTimeFormatOptions = {
//         month: 'short',
//         day: 'numeric'
//     };
//     const date = now.toLocaleDateString(undefined, options);

//     return `${day}, ${date}`;
// }
