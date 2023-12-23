"use strict";
(() => {
  var __async = (__this, __arguments, generator) => {
    return new Promise((resolve, reject) => {
      var fulfilled = (value) => {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      };
      var rejected = (value) => {
        try {
          step(generator.throw(value));
        } catch (e) {
          reject(e);
        }
      };
      var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
      step((generator = generator.apply(__this, __arguments)).next());
    });
  };

  // src/figma/code.ts
  figma.showUI(`<script>window.location.href = '${"http://localhost:5173?figma=1"}'<\/script>`, {
    width: 400,
    height: 700
  });
  figma.ui.onmessage = (message, props) => __async(void 0, null, function* () {
    if (!"http://localhost:5173?figma=1".includes(props.origin)) {
      return;
    }
    switch (message.type) {
      case "EVAL": {
        const fn = eval.call(null, message.code);
        try {
          const result = yield fn(figma, message.params);
          figma.ui.postMessage({
            type: "EVAL_RESULT",
            result,
            id: message.id
          });
        } catch (e) {
          figma.ui.postMessage({
            type: "EVAL_REJECT",
            error: typeof e === "string" ? e : e && typeof e === "object" && "message" in e ? e.message : null,
            id: message.id
          });
        }
        break;
      }
    }
  });
})();
