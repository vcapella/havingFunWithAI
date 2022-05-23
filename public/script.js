(function () {
  const url = "https://api.openai.com/v1/engines/text-curie-001/completions";

  async function submitPrompt() {
    const data = {
      prompt: document.getElementById("enter-prompt").value,
      temperature: 0.7,
      max_tokens: 128,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    };
    var openAiKey = document.getElementById("openAiKey").value;
    axios
      .post(url, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + openAiKey,
        },
      })
      .then((response) => {
        console.log(`GET response`, response);
        responses.unshift({
          prompt: data.prompt,
          response: response.data.choices[0].text,
        });

        var text = responses
          .map((item) =>
            template
              .replace("{{prompt}}", item.prompt)
              .replace("{{response}}", item.response)
          )
          .join("");
        document.getElementById("my-list").innerHTML = text;
      })
      .catch((error) => console.error(error));
  }

  var responses = [];
  var template = `
          <div class="card">
              <div class="card-body">
                  <h5 class="card-title">{{prompt}}</h5>
                  <p class="card-text">{{response}}</p>
              </div>
          </div>`;

  document.getElementById("submitBtn").addEventListener("click", submitPrompt);
})();
