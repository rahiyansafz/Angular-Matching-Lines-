import { Component } from '@angular/core';
import { fromEvent } from 'rxjs'

declare var LeaderLine: any;

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  name = 'Angular';
  mapping = [];
  mapping2 = []
  mappedObj = {};
  mappedObj2 = {};
  selection;
  selection2;
  mapped: boolean = false;

  savedMappings = [];

  constructor() {
    this.createAry();
  }

  mappedIndex;

  selectionWasMapped(id) {
    for (let i = 0; i < this.savedMappings.length; i++) {
      if (this.savedMappings[i].mapping === id) {
        this.mappedIndex = i;
        return true;
      }
    }
  }

  selectionWasMapped2(id) {
    for (let i = 0; i < this.savedMappings.length; i++) {
      if (this.savedMappings[i].mapping2 === id) {
        this.mappedIndex = i;
        return true;
      }
    }
  }

  el;

  leader(id, id2) {
    let startEl = document.getElementById(id);
        let endEl = document.getElementById(id2);

    return new LeaderLine(
      startEl,
      endEl, {
        endPlugOutline: false,
        animOptions: { duration: 3000, timing: 'linear' }
      }
    );
  }

  doSomething(el: HTMLElement) {
    this.el = el.id;
    this.el2 = undefined;

    if (this.mapped) {
      this.selection = undefined;
      this.selection2 = undefined;
      this.mapped = false;
    }
    if (this.selectionWasMapped(el.id)) {
      this.savedMappings[this.mappedIndex].line.setOptions({dashed: true});
      console.log("hi");
    } else if (this.selection === el.id) {
      this.el = '';

      this.selection = '';
    } else {
      this.selection = el.id;
    }

    if (this.isMapped()) {
      //save
      //mark mapped
      let l = this.leader(this.selection, this.selection2);
      this.mappedObj[this.selection] = true;
      this.mappedObj2[this.selection2] = true;
      this.save(l);
    }
  }

  save(l) {
    this.savedMappings.push({ 
      mapping: this.selection, 
      mapping2: this.selection2,
      line: l
     });
  }

  isMapped() {
    this.mapped = this.selection && this.selection2;;
    return this.mapped;
  }

  el2;
  doSomething2(el2: HTMLElement) {
    this.el2 = el2.id;
    this.el = undefined;
    if (this.mapped) {
      this.selection = undefined;
      this.selection2 = undefined;
      this.mapped = false;
    }
    console.log(el2.id);


    if (this.selectionWasMapped2(el2.id)) {
      this.savedMappings[this.mappedIndex].line.setOptions({color: 'red'});
    } else if (this.selection2 === el2.id) {
      this.el2 = '';

      this.selection2 = '';
    } else {
      this.selection2 = el2.id;
    }

    if (this.isMapped()) {
      //save
      //mark mapped
      let l = this.leader(this.selection, this.selection2);

      this.mappedObj[this.selection] = true;
      this.mappedObj2[this.selection2] = true;

      this.save(l);
    }
  }




  createAry() {
    for (let i = 0; i < 10; i++) {
      this.mapping.push({ id: i });
      this.mapping2.push({ id: i })
    }
  }
}
