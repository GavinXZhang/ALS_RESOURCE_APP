import { IChoice, IQuestion, ISolution } from '@/types/api_types';
import { API_URL } from '@/constants/globals';

/**
 * 
 * @param APIURL 
 * 
const fetchAnyData = async (APIURL:string): Promise<any> => {
    const res = await fetch(APIURL, {
      method: "GET",
      });
    return await res.json();
}

 * @returns 
 */

/**
 * Get the Choices based on questionId
 * @param questionId 
 * @returns an array of choices
 */
export const getChoices = async(questionId: string) => {
    let choices_list : IChoice[] = []
    const response = await fetchAnyData(API_URL+"/api/question-to-choice-maps/"+questionId+"?populate=*")
    
    // Get the choices from the response
    for (const element of response.data.attributes.question_to_choices.data) {
        choices_list.push({id: element.id, title: element.attributes.ChoiceName})
    }
    return choices_list
}


/**
 * Get the Question and Choices based on questionId
 * @param questionId 
 * @returns question and an array of choices
 */
export const getQuestionNChoices = async(questionId: string) => {
    let question: IQuestion = {id:"", title:""}
    let choices_list : IChoice[] = []
    const response = await fetchAnyData(API_URL+"/api/question-to-choice-maps/"+questionId+"?populate=*")
    
    // Get the Question form the response
    question = {
        id: response.data.id,
        title: response.data.attributes.QuestionName
    }
    
    // Get the choices from the response
    for (const element of response.data.attributes.question_to_choices.data) {
        choices_list.push({id: element.id, title: element.attributes.ChoiceName})
    }
    return {question: question, choices: choices_list}
}


/**
 * Get the nextQuestion and solution based on choiceId
 * @param choiceId 
 * @returns nextQuestion and solution
 */
export const getNextQuestionOrSolution = async(choiceId: string) => {
    let nextQuestion: IQuestion = {id:"", title:""}
    let solution : ISolution = {id: "", title: ""}
    const response = await fetchAnyData(API_URL+"/api/choice-to-question-maps/"+choiceId+"?populate=*")
    
    // If there's no next question, check if there's a solution and return it
    if (response.data.attributes.choice_to_question.data == null){
        if (response.data.attributes.ChoiceToSolutionMap.data != null){
            solution = {
                id: response.data.attributes.ChoiceToSolutionMap.data.id, 
                title: response.data.attributes.ChoiceToSolutionMap.data.attributes.Title
            }
          }        
        return {nextQuestion: nextQuestion, solution: solution}
    }
    
    // Get the next question from the response
    nextQuestion = {
        id: response.data.attributes.choice_to_question.data.id,
        title: response.data.attributes.choice_to_question.data.attributes.QuestionName
    }
    return {nextQuestion: nextQuestion, solution: solution}
}