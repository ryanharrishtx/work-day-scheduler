const currentDay = $("#currentDay");
const timeBlocks = document.querySelector(`.container-fluid`).children;
const saveBtn = $(".saveBtn");
const textArea = $(".description");

$(function () {


  // Display current date in header
  setInterval(function () {
    currentDay.text(dayjs().format("dddd, MMMM D hh:mm A"))
  })
  }, 1000);

  function setTimeBlockClass() {
  const currentHour = dayjs().format("H");
  console.log(currentHour);
  
  for (let i = 0; i < timeBlocks.length; i++) {
    const timeBlock = $(timeBlocks[i]);
    const timeBlockHour = parseInt(timeBlock.attr("id").split("-")[1]);
    console.log(timeBlockHour);
    if (timeBlockHour === currentHour) {
      timeBlock.addClass("present");
    } else if (timeBlockHour < currentHour) {
      timeBlock.addClass("past");
    } else {
      timeBlock.addClass("future");
    }
  }
}

  // Set time-block class based on current time
  // function setTimeBlockClass() {
  //   const currentHour = dayjs();
  //   console.log(currentHour);

  //   timeBlocks.each(function () {
  //     const timeBlock = $(this);
  //     const timeBlockHour = parseInt(timeBlock.attr("id").split("-")[1]);

  //     if (timeBlockHour === currentHour) {
  //       timeBlock.addClass("present");
  //     } else if (timeBlockHour < currentHour) {
  //       timeBlock.addClass("past");
  //     } else {
  //       timeBlock.addClass("future");
  //     }
  //   });
  // }

  // Get user input from local storage and set textarea value
  // function setSavedInput() {
  //   textArea.each(function () {
  //     const timeBlock = $(this);
  //     const timeBlockId = timeBlock.attr("id");
  //     const savedInput = localStorage.getItem(timeBlockId);

  //     if (savedInput) {
  //       timeBlock.val(savedInput);
  //     }
  //   });
  // }

  // Save user input to local storage
  function saveInput() {
    const timeBlockId = $(this).parent().attr("id");
    const userInput = $(this).siblings(".description").val();

    localStorage.setItem(timeBlockId, userInput);
  }

  // Set time-block class and saved user input on page load
  setTimeBlockClass();
  // setSavedInput();

  // Add click event listener to save button
  saveBtn.on("click", saveInput);

  // Update time-block class every 5 minutes
  setInterval(setTimeBlockClass, 300000);

  // Update saved user input every 5 minutes
  // setInterval(setSavedInput, 300000);

