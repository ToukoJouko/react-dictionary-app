import axios from "axios";
import React, { useState, useEffect } from "react";
import SearchForm from "./components/SearchForm";
import WordInfo from "./components/WordInfo";
import DefinitionCard from "./components/DefinitionCard";
import WotdCard from "./components/WotdCard";
import SynonymList from "./components/SynonymList";
import ErrorMessage from "./components/ErrorMessage";
import LinkAndLogo from "./components/LinkAndLogo";
import BeatLoader from "react-spinners/BeatLoader";
import "./components/componentStyles.css";

const App = () => {
  const [word, setWord] = useState("");
  const [wordOfTheDay, setWordOfTheDay] = useState("");
  const [synonyms, setSynonyms] = useState([]);
  const [wordDefinitions, setwordDefinitions] = useState([]);
  const [wordData, setWordData] = useState({
    word: "",
    audio: "",
    pronounciation: "",
  });
  const [showWordData, setShowWordData] = useState(false);
  const [showWotdCard, setShowWotdCard] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const API_KEY = process.env.REACT_APP_API_KEY;

  //get word of the day
  useEffect(() => {
    setLoading(true);
    setShowError(false);
    axios
      .get(
        `https://api.wordnik.com/v4/words.json/wordOfTheDay?api_key=${API_KEY}`
      )
      .then((response) => {
        //console.log(response.data);
        setLoading(false);
        setShowWotdCard(true);
        setWordOfTheDay(response.data.word);
      });
  }, [API_KEY]);

  //get definitons for the searched word
  const getDefinitions = (word) => {
    const definitionUrl = `https://api.wordnik.com/v4/word.json/${word}/definitions?limit=200&includeRelated=false&sourceDictionaries=ahd-5&useCanonical=false&includeTags=false&api_key=${API_KEY}`;

    setLoading(true);
    axios.get(definitionUrl).then((response) => {
      setShowWotdCard(false);
      setLoading(false);
      setwordDefinitions(response.data);
      //console.log(response.data);
    });
  };

  //this function finds the synonym category from the fetched data
  const findSynonyms = (category) => {
    return category.relationshipType === "synonym";
  };

  //get list of synonyms
  const getSynonyms = (word) => {
    const synonymUrl = `https://api.wordnik.com/v4/word.json/${word}/relatedWords?useCanonical=false&limitPerRelationshipType=10&api_key=${API_KEY}`;

    axios.get(synonymUrl).then((response) => {
      //console.log(response.data.find(findSynonyms).words);
      setSynonyms(response.data.find(findSynonyms).words);
    });
  };

  //get other data
  const getWordData = (word) => {
    const pronRequest = axios.get(
      `https://api.wordnik.com/v4/word.json/${word}/pronunciations?useCanonical=false&sourceDictionary=ahd-5&limit=50&api_key=${API_KEY}`
    );
    const audioRequest = axios.get(
      `https://api.wordnik.com/v4/word.json/${word}/audio?useCanonical=false&limit=50&api_key=${API_KEY}`
    );
    axios
      .all([audioRequest, pronRequest])
      .then(
        axios.spread(function (audioRes, pronRes) {
          //console.log(definitionRes.data);
          //console.log(audioRes.data);
          setWordData({
            //definition: [definitionRes.data],
            word: audioRes.data[1].word,
            audio: audioRes.data[1].fileUrl,
            pronounciation: pronRes.data[0].raw,
          });
        })
      )
      .catch((error) => {
        //console.log(error.response.status);
        setLoading(false);
        setShowWotdCard(false);
        setShowWordData(false);
        setShowError(true);
        if (word === "") {
          setErrorMessage("The search field is empty!");
        } else if (error.response.status === 429) {
          setErrorMessage(
            "Too many API calls! Please wait for a moment and try again."
          );
        } else {
          setErrorMessage(`Data for the word '${word}' cannot not be found`);
        }
      });
  };

  /*  
  const handleRandom = (event) => {
    event.preventDefault();
    const randomUrl = `https://api.wordnik.com/v4/words.json/randomWord?hasDictionaryDef=true&minCorpusCount=10000&maxCorpusCount=-1&minDictionaryCount=7&maxDictionaryCount=-1&minLength=5&maxLength=-1&api_key=${API_KEY}`;
    axios.get(randomUrl).then((response) => {
      console.log(response.data);
      getWordData(response.data.word);
      getDefinitions(response.data.word);
      getSynonyms(response.data.word);
      setShowWordData(true);
    });
  };
*/

  const handleChange = (event) => {
    setWord(event.target.value);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    setShowError(false);
    setShowWotdCard(false);
    setErrorMessage(null);
    getWordData(word);
    getDefinitions(word);
    getSynonyms(word);
    setShowWordData(true);
  };

  return (
    <div className="main">
      <SearchForm
        searchWord={handleSearch}
        word={word}
        handleChange={handleChange}
      />
      {showError ? (
        <ErrorMessage message={errorMessage} />
      ) : (
        <BeatLoader loading={loading} />
      )}
      {/*
      <button onClick={handleRandom}>random</button>
      */}
      {!loading && showWotdCard ? (
        <WotdCard wotd={wordOfTheDay} />
      ) : (
        <BeatLoader loading={loading} />
      )}
      {!loading && showWordData ? (
        <div>
          <WordInfo
            word={wordData.word}
            pronounciation={wordData.pronounciation}
            audioUrl={wordData.audio}
          />
          {wordDefinitions.map((definition, index) => {
            return (
              <DefinitionCard
                key={index}
                partOfSpeech={definition.partOfSpeech}
                definition={definition.text}
              />
            );
          })}
          <div>
            <SynonymList synonyms={synonyms} />
          </div>
        </div>
      ) : (
        <BeatLoader loading={loading} />
      )}
      <LinkAndLogo />
    </div>
  );
};

export default App;
