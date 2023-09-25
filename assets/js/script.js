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

  // Set time-block class based on current time
  function setTimeBlockClass() {
  const currentHour = dayjs().format("H");
  console.log(currentHour);
  
  for (let i = 0; i < timeBlocks.length; i++) {
    const timeBlock = $(timeBlocks[i]);
    const timeBlockHour = parseInt(timeBlock.attr("id").split("-")[1]);
    console.log(timeBlockHour);
    if (timeBlockHour == currentHour) {
      timeBlock.addClass("present");
    } else if (timeBlockHour < currentHour) {
      timeBlock.addClass("past");
    } else {
      timeBlock.addClass("future");
    }
  }
}

  function saveInput() {
    const userInput = $(this).siblings(".description").val();
    const timeBlockId = $(this).parent().attr("id");
    const timeBlock = $(this);
    const saveInput = localStorage.setItem(timeBlockId, userInput);

    if (saveInput !== null) {
      timeBlock.val(saveInput);
    }

  }

//Get user input from local storage and set textarea value
function setSavedInput() {
  for (let i = 9; i < 17; i++){
    $(`#hour-${i} .description`).val(localStorage.getItem(`hour-${i}`))
  }
}
  // Add click event listener to save button
saveBtn.on("click", saveInput);

// Set time-block class and saved user input on page load
setTimeBlockClass();
setSavedInput();

// Update time-block class every 5 minutes
setInterval(setTimeBlockClass, 300000);

// Update saved user input every 5 minutes
setInterval(setSavedInput, 300000);

