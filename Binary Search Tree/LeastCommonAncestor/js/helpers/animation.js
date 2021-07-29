var toggleAnimation = function () {
  if (animationStarted) {
    isPlayingSubject$.isPlaying = !isPlayingSubject$.isPlaying;
    document.getElementById("play-button").innerHTML =
      isPlayingSubject$.isPlaying ? "Pause" : "Play";
  } else {
    startAnimation();
  }
};

var nextStep = function () {
  if (!algoSteps.length) {
    calcAlgoSteps();
  }
  const status = algoSteps[currentStepIndex][0];
  const circle = algoSteps[currentStepIndex][1];
  const steps = algoSteps[currentStepIndex][2];
  currentStepIndex++;
  highlight(status, circle, steps);
};

const isPlayingSubject$ = {
  val: false,
  get isPlaying() {
    return this.val;
  },
  set isPlaying(newVal) {
    this.val = newVal;
    this.listener(newVal);
  },
  listener: function (value) {},
  registerListener: function (listener) {
    this.listener = listener;
    listener(this.val);
  },
  clearListener: function () {
    this.listener = function (value) {};
  }
};
