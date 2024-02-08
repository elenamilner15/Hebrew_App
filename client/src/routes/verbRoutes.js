// client\src\routes\verbRoutes.js
import React from 'react';
import { Route, } from 'react-router-dom';
import MainContent from '../components/MainContent';


import Vocabulary from '../components/L_Vocabulary';
import VocabularyGame from '../components/G_Vocabulary';
import Grammar from '../components/L_Grammar';
import Steps from '../components/L_Steps';


const verbRoutes = (
    <>
        {/* <Route path="/verbs" element={<VerbsPage />} /> */}
        {/* <Route path="/:content/:level" element={<MainContent />} /> */}


        {/* <Route path="/verbs/:content/:level" element={<MainContent />} /> */}

        <Route path="/vocabulary" element={<Vocabulary />} />
        <Route path="/vocabulary/:level/:category" element={<VocabularyGame />} />


        <Route path="/verbs/:content" element={<MainContent />} />
        <Route path="/vocabulary" element={<Vocabulary />} />
        <Route path="/grammar" element={<Grammar />} />
        <Route path="/steps" element={<Steps />} />

    </>
);

export default verbRoutes;
