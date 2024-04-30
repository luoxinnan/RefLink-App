import { useState } from "react";
import Alert from "./Alert";
import TextInput from "./TextInput";
import TextArea from "./TextArea";
import { useNavigate } from "react-router-dom";
import {
  FieldValues,
  SubmitHandler,
  useFieldArray,
  useForm,
} from "react-hook-form";
import { Employer, PostingRequest, QuestionRequest } from "../Types";
import { useMutation } from "react-query";
import { getAIAnswer } from "../services/aiServices";

const ratingQuestions = [
  "Rating questions",
  "Adaptability",
  "Collaboration",
  "Creativity",
  "Detail-oriented",
  "Learning Agility",
  "Work Efficiency",
  "Time Management",
];

export default function AddPostingForm({ employer }: Props) {
  const [showAlertAdded, setShowAlertAdded] = useState<boolean>(false);
  const [clickedButtons, setClickedButtons] = useState<boolean[]>(
    Array(ratingQuestions.length).fill(false)
  );
  const { register, handleSubmit, control } = useForm();
  const [inputText, setInputText] = useState("");
  const [generatedTexts, setGeneratedTexts] = useState<string[]>(
    Array(15).fill("")
  );
  const [fetching, setFetching] = useState(false);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "questions",
  });
  const navigate = useNavigate();

  // Add default value for the first question field
  if (fields.length === 0) {
    append({ content: "" });
  }

  const postMutation = useMutation({
    mutationFn: postPosting,
    onSuccess: async (data) => {
      return data;
    },
  });

  const questionMutation = useMutation({
    mutationFn: postQuestions,
    onSuccess: async (data) => {
      console.log("We have successfully posted a question");
      return data;
    },
  });

  async function postPosting(data: PostingRequest) {
    const response = await fetch("http://localhost:5136/api/postings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return await response.json();
  }

  async function postQuestions(data: QuestionRequest) {
    console.log("postQuestion", data);
    const response = await fetch("http://localhost:5136/api/questions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return await response.json();
  }

  async function handleAdd(data: FieldValues) {
    console.log("handleAdd data", data);

    const postingData: PostingRequest = {
      title: data.postingTitle,
      description: data.postingDescription,
      employerGuid: employer.guidId,
    };

    const postingResponse = await postMutation.mutateAsync(postingData);
    const postingGuid = postingResponse.guidId;

    const questions = data.questions;

    console.log("questions", questions);

    for (const question of questions) {
      console.log("question", question.content);
      const questionsData: QuestionRequest = {
        postingGuid: postingGuid,
        content: question.content,
      };

      console.log("Here is a questionRequest: ", questionsData);

      const questionResponse = await questionMutation.mutateAsync(
        questionsData
      );
      console.log(questionResponse.json);
    }

    // post rating questions
    for (let i = 0; i < ratingQuestions.length; i++) {
      if (clickedButtons[i] == true) {
        const ratingQuestionsData: QuestionRequest = {
          postingGuid: postingGuid,
          content: ratingQuestions[i],
        };
        const postedQuestions = await postQuestions(ratingQuestionsData);
        console.log("!!!!! ratingQuestions posted: " + postedQuestions);
      }
    }

    // TODO: complete logic with alert and redirect ON SUCCESS ONLY
    // if success then show this
    setShowAlertAdded(true);

    setTimeout(() => {
      setShowAlertAdded(false);
      // navigate("/postings");
    }, 2000);
  }

  function handleClick(index: number) {
    const newClickedButtons = [...clickedButtons];
    newClickedButtons[index] = !clickedButtons[index];
    setClickedButtons(newClickedButtons);
  }

  function handleBackClick() {
    navigate(-1);
  }

  async function handleAiRequest(inputText: string, i: number) {
    console.log("input text: " + inputText);
    try {
      const newGeneratedTexts = [...generatedTexts];
      setFetching(true);
      const result = await getAIAnswer(inputText);
      console.log("generated: " + result); // Testing
      newGeneratedTexts[i] = result;
      setGeneratedTexts(newGeneratedTexts);
    } catch (error) {
    } finally {
      setFetching(false);
    }
  }

  // TODO: add validations

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <h2 className="text-xl mb-8 text-center">Add a Posting</h2>
        <form
          className="w-full md:w-3/4 lg:w-2/3"
          onSubmit={handleSubmit(handleAdd)}
        >
          <fieldset className="border border-slate-150 rounded-sm p-3 mb-9 shadow-lg">
            <legend className="text-sm text-slate-500 mb-2">
              Posting details
            </legend>
            <TextInput
              register={register}
              name="postingTitle"
              inputType="text"
              labelText="Name"
              placeholder="Posting name"
            />
            {/* AI prop text */}
            <label className="form-control w-full mb-4">
              <span className="label-text">Description</span>
              <textarea
                {...register(`postingDescription>`, {
                  required: "This field can not be empty",
                })}
                name={`postingDescription`}
                className="input input-bordered input-md w-full "
                placeholder="Write description here for AI prompt"
                onChange={(e) => setInputText(e.target.value)}
              />
            </label>
          </fieldset>

          <fieldset className="border border-slate-150 rounded-sm p-3 mb-9 shadow-lg">
            <legend className="text-sm text-slate-500 mb-2">
              Add text questions
            </legend>

            {fields.map((question, i) => (
              <>
                <div key={`${question}${i}`}>
                  <label className="form-control w-full mb-4">
                    <span className="label-text"></span>
                    {/* AI generated question */}
                    <textarea
                      {...register(`questions[${i}].content`, {
                        required: "This field can not be empty",
                      })}
                      name={`questions[${i}].content`}
                      className="input input-bordered input-md w-full h-16"
                      placeholder="Add a question"
                      value={generatedTexts[i]}
                    />
                  </label>

                  <div className="flex gap-3 mb-6">
                    <button
                      className="btn btn-square btn-xs"
                      type="button"
                      onClick={() => append({ content: "" })}
                    >
                      <svg
                        className="w-6 h-6 text-gray-800 w-4"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        {" "}
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M5 12h14m-7 7V5"
                        />{" "}
                      </svg>
                    </button>
                    <button
                      className="btn btn-square btn-xs"
                      type="button"
                      onClick={() => remove(i)}
                    >
                      <svg
                        className="w-6 h-6 text-gray-800 w-4"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M5 12h14"
                        />
                      </svg>
                    </button>
                    <button
                      disabled={fetching}
                      className={
                        "btn btn-square btn-xs " +
                        `${fetching ? "btn-base" : "btn-outline"}`
                      }
                      onClick={() => handleAiRequest(inputText, i)}
                    >
                      <svg
                        className="w-6 h-6 text-gray-800 w-4"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M12 18.5A2.493 2.493 0 0 1 7.51 20H7.5a2.468 2.468 0 0 1-2.4-3.154 2.98 2.98 0 0 1-.85-5.274 2.468 2.468 0 0 1 .92-3.182 2.477 2.477 0 0 1 1.876-3.344 2.5 2.5 0 0 1 3.41-1.856A2.5 2.5 0 0 1 12 5.5m0 13v-13m0 13a2.493 2.493 0 0 0 4.49 1.5h.01a2.468 2.468 0 0 0 2.403-3.154 2.98 2.98 0 0 0 .847-5.274 2.468 2.468 0 0 0-.921-3.182 2.477 2.477 0 0 0-1.875-3.344A2.5 2.5 0 0 0 14.5 3 2.5 2.5 0 0 0 12 5.5m-8 5a2.5 2.5 0 0 1 3.48-2.3m-.28 8.551a3 3 0 0 1-2.953-5.185M20 10.5a2.5 2.5 0 0 0-3.481-2.3m.28 8.551a3 3 0 0 0 2.954-5.185"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </>
            ))}
          </fieldset>

          <fieldset
            id="rating-question-tags"
            className="border border-slate-150 rounded-sm p-3 mb-9 shadow-lg"
          >
            <legend className="text-sm text-slate-500 mb-2">
              Rating questions
            </legend>
            {ratingQuestions.map((question, i) => (
              <button
                className={`btn btn-sm mb-2 mr-2 ${clickedButtons[i] ? "btn-success" : ""
                  }`}
                onClick={() => handleClick(i)}
                name={i.toString()}
              >
                {question}
              </button>
            ))}
          </fieldset>

          <button type="submit" className="btn btn-neutral btn-sm mr-2 w-20">
            {" "}
            Submit
          </button>
          <button
            className="btn bth-neutral btn-outline btn-sm mr-2 w-20"
            onClick={handleBackClick}
          >
            Cancel
          </button>
        </form>
      </div>
      {showAlertAdded && (
        <Alert alertType="alert-success" alertContent="Posting added!" />
      )}
    </>
  );
}

type Props = {
  employer: Employer;
}
