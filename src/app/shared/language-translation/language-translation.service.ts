import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { LanguageTranslationTree } from '../shared';

@Injectable()
export class LanguageTranslationService {

  private _languageTranslationTrees: LanguageTranslationTree[][] = [];

  constructor() { }

  getTranslation(lang) {
    if (this._languageTranslationTrees[lang]) {
      const completeTranslationTree: LanguageTranslationTree[] = this._languageTranslationTrees[lang];
      return Observable.of(completeTranslationTree);
    } else {
      return Observable.of({});
    }
  } // end getTranslation

  registerTranslation(topLevelTag: string, languageCode: string, translationData: LanguageTranslationTree) {
    if (!this._languageTranslationTrees[languageCode]) {
      this._languageTranslationTrees[languageCode] = [];
    }
    this._languageTranslationTrees[languageCode][topLevelTag] = translationData;
  } // end registerTranslation

} // end LanguageTranslationService
