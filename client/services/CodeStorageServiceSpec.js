// Copyright 2017 The TIE Authors. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS-IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * @fileoverview Unit tests for the CodeStorageService.
 */

describe('CodeStorageService', function() {
  var CodeStorageService;
  var questionIds = [];
  var studentSubmittedCodes = [];
  var i;
  for (i = 0; i < 5; i++) {
    questionIds[i] = 'question_' + (i + 1);
    studentSubmittedCodes[i] = 'code_' + (i + 1);
  }
  const language = 'python';
  const failedLanguage = 'java';

  var generateRandomChars = function(number) {
    var generatedChars = "";
    var possible = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    for (i = 0; i < number; i++) {
      generatedChars += possible.charAt(
        Math.floor(Math.random() * possible.length));
    }
    return generatedChars;
  };

  var randomQuestionIds = [];
  var randomQuestionCodes = [];

  const questionIdLenRange = 10;
  const codeLenRange = 10000;
  const numOfCases = 5;

  for (i = 0; i < numOfCases; i++) {
    randomQuestionIds[i] = generateRandomChars(
      Math.floor(Math.random() * questionIdLenRange));
    randomQuestionCodes[i] = generateRandomChars(
      Math.floor(Math.random() * codeLenRange));
  }
  
  beforeEach(module('tie'));
  beforeEach(inject(function($injector) {
    CodeStorageService = $injector.get('CodeStorageService');
  }));

  describe('storeCode', function() {
    it('should store code to browser', function() {
      for (i = 0; i < numOfCases; i++) {
        CodeStorageService
        .storeCode(questionIds[i], studentSubmittedCodes[i], language);
        expect(JSON.parse(localStorage.getItem(questionIds[i]))[language])
          .toEqual(studentSubmittedCodes[i]);
      }        
    });
  });

  describe('loadStoredCode', function() {
    it('should retrieve stored code from browser', function() {
      for (i = 0; i < numOfCases; i++) {
        var storedCode = {};
        storedCode[language] = studentSubmittedCodes[i];
        localStorage.setItem(questionIds[i], JSON.stringify(storedCode));
      }
      for (i = 0; i < numOfCases; i++) {
        expect(CodeStorageService.loadStoredCode(questionIds[i], language))
          .toEqual(studentSubmittedCodes[i]);
      }
    });

    it('should fail to retrieve code and return null', function() {
      for (i = 0; i < numOfCases; i++) {
        expect(!CodeStorageService
          .loadStoredCode(questionIds[i], failedLanguage)).toBe(true);
      }
    });
  });

  describe('storeAndLoadCode', function() {
    it('should store and load stored code from browser', function() {
      for (i = 0; i < randomQuestionIds.length; i++) {
        CodeStorageService.storeCode(randomQuestionIds[i],
          randomQuestionCodes[i], language);
        expect(CodeStorageService
          .loadStoredCode(randomQuestionIds[i], language))
          .toEqual(randomQuestionCodes[i]);
      }
    });
  });
});
