function clear_months() {
  document.querySelectorAll('.month').forEach(function(month) {
    month.style.display = "none";
  })
}

function show_month_label(month_year) {
  document.getElementById('selected_date').innerText = month_year.innerText;
}

function show_month_cal(month_year) {
  const month_cal_val = month_year.dataset["month"];
  clear_months();
  show_month_label(month_year);
  document.getElementById(month_cal_val).style.display = "block";
}

document.querySelectorAll('.month-year').forEach(function(month_year) {
  month_year.addEventListener('click', function(e) {
    e.preventDefault();
    show_month_cal(month_year);
    e.target.blur();
  });
});

document.querySelectorAll('.event-summary').forEach(function(event_summary) {
  event_summary.addEventListener('blur', function(e) {
    e.target.parentElement.removeAttribute("open");
  })
});