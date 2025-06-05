
import { Character } from '../types';
import { formatChoiceResponse } from './responseTemplates';
import { getRandomChoice } from './randomUtils';

// Function to detect and handle "or" questions
export const handleOrQuestion = (question: string, characterType: Character['type']): { answer: string; templateType: 'choice' } | null => {
  const lowerQuestion = question.toLowerCase();

  if (lowerQuestion.includes(' or ')) {
    const orIndex = lowerQuestion.indexOf(' or ');
    const beforeOr = question.substring(0, orIndex).trim();
    const afterOr = question.substring(orIndex + 4).trim();
    
    let options = [];
    
    const parts = question.split(/\s+or\s+/i);
    if (parts.length >= 2) {
      const firstOption = parts[0].replace(/^(should i|do i|can i|will i|shall i|would i)\s+/i, '').trim();
      options.push(firstOption);
      
      for (let i = 1; i < parts.length; i++) {
        options.push(parts[i].replace(/\?$/, '').trim());
      }
      
      const randomOption = getRandomChoice(options);
      return {
        answer: formatChoiceResponse(randomOption, characterType),
        templateType: 'choice'
      };
    }
  }
  
  else if (lowerQuestion.includes('cuisine')) {
    const cuisines = ['Italian', 'Thai', 'Mexican', 'Japanese', 'Indian', 'Chinese', 'Mediterranean', 'Korean', 'Vietnamese', 'Greek', 'French', 'Lebanese', 'Ethiopian', 'Spanish', 'American'];
    const randomCuisine = getRandomChoice(cuisines);
    return {
      answer: formatChoiceResponse(randomCuisine, characterType),
      templateType: 'choice'
    };
  }
  
  else if (lowerQuestion.includes('dinner') || lowerQuestion.includes('lunch') || lowerQuestion.includes('hungry')) {
    const meals = ['Pizza', 'Sushi', 'Tacos', 'Pasta', 'Ramen', 'Burgers', 'Poke Bowl', 'Biryani', 'Sandwich', 'Salad', 'Curry', 'Dumplings', 'Pho', 'Bibimbap', 'Shawarma'];
    const randomMeal = getRandomChoice(meals);
    return {
      answer: formatChoiceResponse(randomMeal, characterType),
      templateType: 'choice'
    };
  }

  else if (lowerQuestion.includes('dessert')) {
    const sweet = ['Ice Cream', 'Cake', 'Milkshake', 'Pudding', 'Cheesecake', 'Cupcakes', 'Bubble Tea', 'Tiramisu', 'Donuts', 'Pie', 'Cookies', 'Chocolates', 'Pastries'];
    const randomSweet = getRandomChoice(sweet);
    return {
      answer: formatChoiceResponse(randomSweet, characterType),
      templateType: 'choice'
    };
  }

  else if (lowerQuestion.includes('movie') || lowerQuestion.includes('genre') ) {
    const movie = ['Thriller', 'Horror', 'RomCom', 'Documentry', 'Action', 'Drama', 'Comedy', 'Romance', 'Feel Good'];
    const randomMovie = getRandomChoice(movie);
    return {
      answer: formatChoiceResponse(randomMovie, characterType),
      templateType: 'choice'
    };
  }
  
  return null;
};
