import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { LanguageTranslationTree, ApplicationEnvironment } from '../shared';


@Injectable()
export class LanguageTranslationService {

  private _languageTranslationTrees: LanguageTranslationTree[][] = [];

  // Injected environment, public for template use as well
  public Environment: ApplicationEnvironment;

  constructor(
    protected injector: Injector,
  ) {
    this.Environment = this.injector.get('ENVIRONMENT');
  } // end constructor

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

    if (this.Environment.translationDebugMode) {
      this.debugTranslationData(translationData);
    } // end if translation debugging mode

    this._languageTranslationTrees[languageCode][topLevelTag] = translationData;
  } // end registerTranslation

  debugTranslationData(translationData: LanguageTranslationTree) {
    for (const key in translationData) {
        // skip loop if the property is from prototype
        if (!translationData.hasOwnProperty(key)) {
          continue;
        }
        const obj = translationData[key];
        for (const prop in obj) {
          // skip loop if the property is from prototype
          if (!obj.hasOwnProperty(prop)) {
            continue;
          }

          if (obj[prop] instanceof Object) {
            const obj2 = obj[prop];
            for (const prop2 in obj2) {
              if (!obj2.hasOwnProperty(prop2)) {
                continue;
              }
              obj2[prop2] = '#' + obj2[prop2] + '#';
            }

          } else {
            // your code
            obj[prop] = '#' + obj[prop] + '#';
          }
        }
    }
  } // end debugTranslationData

} // end LanguageTranslationService
