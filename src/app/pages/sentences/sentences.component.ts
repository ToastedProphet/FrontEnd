import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import { IWords } from './interfaces/words.interface';
import { IWordTypes } from './interfaces/wordTypes.interface';

@Component({
  selector: 'app-sentences',
  templateUrl: './sentences.component.html',
  styleUrls: ['./sentences.component.css']
})
export class SentencesComponent implements OnInit {

  mSentencesList: any=[];
  mWordsList: IWords[]=[];
  mWordTypesList: IWordTypes[]=[];

  mSelectedWordType: IWordTypes;
  mSelectedWord: IWords;

  mSentence: string = '';

  constructor(
    private service : SharedService
  ) { }

  ngOnInit() {
    this.loadSentenceList();
    this.loadWordTypes();
  }

  loadSentenceList() {
    this.service.getSentences().subscribe(data=> {
      this.mSentencesList = data;
    })
  }

  loadWords() {
    this.mWordsList = [];
    this.service.getWords().subscribe(data=> {
      for (const W of data) {
        if(W.WordTypeId === this.mSelectedWordType.WordTypeId) {
          this.mWordsList.push(W)
        }
      }
    })
  }

  loadWordTypes() {
    this.service.getWordTypes().subscribe(data=> {
      this.mWordTypesList = data;
    })
  }

  OnWordTypeChange() {
    this.loadWords();
  }

  onAddWordClick() {
    //1st word in senctence start with capital, rest lowercase
    if(this.mSentence.length > 0) {
      this.mSentence += (' ' + this.mSelectedWord.Word.toLowerCase());
    } else {
      this.mSentence = this.mSelectedWord.Word;
    }
  }

  onCancelClick() {
    this.mSentence = '';
  }

  onAddClick() {
    this.service.addSentence(this.mSentence).subscribe(data=> {
      alert(data);
      this.mSentence = '';
      this.loadSentenceList();
    })
  }
}
