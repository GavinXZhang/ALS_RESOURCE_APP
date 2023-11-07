import { Stack, Text, Button } from '@mantine/core';
import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import Title from '../components/Title/Titles';
import { IQuestion, IChoice, IBodyContent, ISolution } from '../types/api_types';
import searchQuestionsChoicesFromJson from '../utils/TempGetNextQuestion';
import { bodyContentUseStyles } from '../components/MainBody/HelperFunctions/BodyContentStyle';
import ToggleButton from '../components/MainBody/TogglebButton';
import SolutionPages from '../utils/SolutionContent';
import Link from 'next/link';

interface Props {}

const QuestionaireBodyContent: React.FC<Props> = () => {
  const { classes } = bodyContentUseStyles();

  //set default state to home
  const [currentContent, setCurrentContent] = useState('home'); 

  // current question state
  const [currQuestion, setCurrQuestion] = useState<IQuestion>({ id: '2', title: 'Which area do you want to look into?' });

  // current choices state
  const [currChoices, setCurrChoices] = useState<IChoice[]>([]);

  // currently clicked choice state
  const [clickedChoice, setClickedChoice] = useState<IChoice>({ id: '1', title: 'Home' });

  // solution state
  const [solution, setSolution] = useState<ISolution>({ id: '', title: '' });

  // whether solution has been found
  const [hasSolution, setHasSolution] = useState(false);

  // page title ref
  const pageTitle = useRef('Home');

  // image ref
  const image = useRef('/titleimghome.PNG');

  // previously selected content ref
  const prevSelectedContent = useRef<IBodyContent[]>([]);

  // memoized search function for questions and choices
  const memoizedSearchQuestionsChoicesFromJson = useMemo(() => {
    return async (choice: IChoice): Promise<[IQuestion, IChoice[], boolean, ISolution]> => {
      return await searchQuestionsChoicesFromJson(choice);
    };
  }, []);

  // updates choices and questions for clicked choice
  const updateChoicesAndQuestions = useCallback(async (choice: IChoice) => {
    try {
      // search for the next set of choices and question using the clicked choice
      const [question, choicesList, hasSol, sol] = await memoizedSearchQuestionsChoicesFromJson(choice);
    
      // set whether or not the next step has a solution
      // setHasSolution(hasSol);
    
      // if the next step has a solution, set the solution
      // otherwise, set the clicked choice
      if (hasSol) {
        setSolution(sol);
        setHasSolution(true);
      } 
      else {
        setSolution({ id: '', title: '' });
        setClickedChoice(choice);
        setHasSolution(false);
      }
    
      // if the question title is not empty, save the current choices, question, and clicked choice
      // in the previous selected content
      if (question.title !== '' && !hasSol) {
        prevSelectedContent.current.push({
          question: currQuestion,
          prevChoice: clickedChoice,
          choiceList: currChoices,
        });
        // set the new choices and question
        setCurrChoices(choicesList);
        setCurrQuestion(question);
      }
    
      // if the selected choice is Communication, set the page title to Communication
      if (choice.title === 'Communication') {
        setCurrentContent('communication');
        pageTitle.current = 'Communication';
        image.current = '/titleImgCommunication.png';
      }
    } catch (error) {
      console.error(error);
      // handle error here, for example by setting an error message state
    }
  }, [clickedChoice, currChoices, currQuestion]);
  

  // run effect only once when component mounts
  useEffect(() => {
    if (clickedChoice !== null) {
      updateChoicesAndQuestions(clickedChoice).catch(error => console.error(error));;
    }
  }, []);

  /**
   * Goes to the previous selected question and choices, and updates the current state with previous state
   *///the way we fetch fprevious question was fixed during dev by using reroute
  const prevQuestion = useCallback(() => {
    if (prevSelectedContent.current.length > 1) {
      const i = 1;

    // if current question has solution
    if (hasSolution) {
      setHasSolution(false)
      return
    }

      // update current state with previous state
      setCurrQuestion(prevSelectedContent.current[prevSelectedContent.current.length-i].question);
      setClickedChoice(prevSelectedContent.current[prevSelectedContent.current.length-i].prevChoice)
      setCurrChoices(prevSelectedContent.current[prevSelectedContent.current.length-i].choiceList)
      
      // remove previous state from the list
      prevSelectedContent.current.pop()

      // set page title and image to default if previous state is not available
      if (prevSelectedContent.current.length < 2){
        pageTitle.current ="Home"
        image.current = "/titleimghome.PNG"
      }

    }
  }, [prevSelectedContent, hasSolution, updateChoicesAndQuestions, clickedChoice]);

  const handleButtonClick = (path: string) => {
    console.log('Navigate to ${path}')
  }

  const handleContentChange = (content: string) => {
    setCurrentContent(content);
  };
  const CommunicationContent = () => {
    // Add the content specific to communication here
    return (
      <div>
        <h2>Communication</h2>
        {/* Add more content and components related to communication */}
      </div>
    );
  };
  
  const ComputerAccessContent = () => {
    // Add the content specific to computer access here
    return (
      <div>
        <h2>Computer Access</h2>
        {/* Add more content and components related to computer access */}
      </div>
    );
  };
  
  const HomeAccessContent = () => {
    // Add the content specific to home access here
    return (
      <div>
        <h2>Home Access</h2>
        {/* Add more content and components related to home access */}
      </div>
    );
  };
  
  const SmartPhoneAccessContent = () => {
    // Add the content specific to smartphone access here
    return (
      <div>
        <h2>Smart Phone Access</h2>
        {/* Add more content and components related to smartphone access */}
      </div>
    );
  };
  
  

  return (
    <div>
      <Title hasPrev={(prevSelectedContent.current.length > 1)} prevQuestion={prevQuestion} titleImg={image.current} title={pageTitle.current} />
      {!hasSolution ? (
        <>
          <Stack
            spacing="xl"
            className={classes.outer}
            sx={(theme) => ({
              backgroundColor:
                theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
            })}
          >
            <Text className={classes.text}> {currQuestion.title} </Text>
            {currChoices.map((choice) => (
              <div key={choice.id}>
                <ToggleButton updateContent={updateChoicesAndQuestions} className={classes.inner} choice={choice} />
              </div>
            ))}
          </Stack>
          <Stack align="center" justify="center" style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
            <Button onClick={() => handleContentChange('communication')}>Communication</Button>
            <Button onClick={() => handleContentChange('computerAccess')}>Computer Access</Button>
            <Button onClick={() => handleContentChange('homeAccess')}>Home Access</Button>
            <Button onClick={() => handleContentChange('smartPhoneAccess')}>Smart Phone Access</Button>
          </Stack>
          {/* Conditionally render content based on the current state */}
          {currentContent === 'communication' && <CommunicationContent />}
          {currentContent === 'computerAccess' && <ComputerAccessContent />}
          {currentContent === 'homeAccess' && <HomeAccessContent />}
          {currentContent === 'smartPhoneAccess' && <SmartPhoneAccessContent />}
        </>
      ) : (
        <SolutionPages solution={solution} hasSolution={hasSolution}/>
      )}
    </div>
  );    
};

export default QuestionaireBodyContent