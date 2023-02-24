import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { IWords } from './pages/sentences/interfaces/words.interface';
import { IWordTypes } from './pages/sentences/interfaces/wordTypes.interface';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  readonly APIUrl = "http://localhost:53006/api"
  constructor(
    private http: HttpClient
  ) { }

  getSentences(): Observable<any[]> {
    return this.http.get<any>(this.APIUrl+'/Sentences');
  }

  addSentence(val:string) {
    const sntce = {Sentence: val};
    return this.http.post(this.APIUrl+'/Sentences',sntce);
  }

  getWords() {
    return this.http.get<IWords[]>(this.APIUrl+'/Words');
  }

  getWordTypes() {
    return this.http.get<IWordTypes[]>(this.APIUrl+'/WordTypes');
  }

}
