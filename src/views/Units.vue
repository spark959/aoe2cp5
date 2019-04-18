
<template>
  <div class="units">

  <div id = "topContent">
    <h1>Type the name of a Unit and it will display basic information about the Unit</h1>
    <div v-if="user">
      <h2>Welcome {{user.username}}!</h2>
      <button @click="logout">Logout</button>
    </div>
  </div>

<div id="unitManip">

  <div>
    <h2>List of Age of Empires II Units</h2>
    <div>
      <ul id = "unitList">
        <li v-if="ready" v-for="unit in listUnits">{{ unit }}</li>
      </ul>
    </div>
  </div>

  <div id = "unitInfo">

    <div id = "singleUnit">
      <form v-on:submit.prevent="createUnit">
        <label>Enter an Age of Empires II Unit   </label>
        <input v-model="unitName" placeholder="Name of Unit">
        <button @click="createUnit">Search</button>
      </form>


      <div id = "unitResults" v-if="display">
        <h2>{{unitName}}</h2>
        <h3>Cost:</h3>
        <ul id = "singleUnitCost">
          <li v-for="mat in relatedArr">{{ mat.name }} {{ mat.price }}</li>
        </ul>
        <h3>{{hp}} HP</h3>
        <p>Armor {{armor}}</p>
        <p>Attack {{attack}}</p>
        <ul id = "attackBonusList">
          <li v-for="bonus in bonusArr">{{bonus}}</li>
        </ul>
      </div>
    </div>
  </div>

  <div id="army">
    <div v-if="user">
    <button @click="dispArmy">Make an Army</button>
    <button @click="dispArmyList">View Available Armies</button>
    <div v-if="displayArmy">
      <input v-model="armyTitle" placeholder="Name of Army">
      <label>Enter an Age of Empires II Unit to add to your army </label>
      <input v-model="currUnit" placeholder="Name of Unit">
      <input v-model="currQuant" placeholder="Quantity of Unit">
      <br>
      <button @click="addToArmy">Add to army</button>
      <br>
      <h3>{{armyTitle}}</h3>
      <ul id="currArmy">
        <li v-for="unit in armyArr">{{ unit.unitName }} x {{unit.quantity}}</li>
      </ul>
    </div>
    <form v-if="displayArmy" v-on:submit.prevent="postArmy">
      <button @click="postArmy">Submit Army</button>
    </form>
    <div v-if="displayArmyList">
      <div class="form">
         <input v-model="findTitle" placeholder="Search">
         <div class="suggestions" v-if="suggestions.length > 0">
           <div class="suggestion" v-for="s in suggestions" @click="selectArmy(s)">{{s.title}}
           </div>
         </div>
         <div v-else>
           <p>There are currently no armies</p>
         </div>
       </div>
    </div>
    <div class="indivArmy" v-if="findArmy">
      <h3>{{findArmy.title}}</h3>
      <button @click="editArmy">Edit Army</button>
      <button @click="delArmy">Delete Army</button>
      <br>
      <div class="editStuff" v-if="edit">
        <input v-model="findArmy.title">
        <br>
        <br>
        <ul>
          <li v-for="unit in findArmy.units">
            <input v-model="unit.unitName"/> X
            <input v-model="unit.quantity"/>
            <button @click="deleteUnit(unit)">Remove</button>
          </li>
        </ul>
        <button @click="putArmy(findArmy)">Submit Edit</button>
      </div>
      <div class="deleteStuff" v-if="del">
        <button @click="deleteArmy(findArmy)">Delete Army Forever</button>
      </div>
      <button @click="doneWithCurrArmy">Done</button>
    </div>
  </div>

  <div v-else>
    <h4>If you would like to make armies, please register for an account or login</h4>
    <router-link to="/register" class="Rbutton">Register</router-link>
    <router-link to="/login" class="Rbutton">Login</router-link>
  </div>
  </div>
</div>
</div>
</template>

<script>
import axios from 'axios';
export default {

  name: 'units',
  data () {
    return {
      //unitInfo DATA
      unitName: '',
      hp: '',
      attack: '',
      attackBonus: [''],
      armor: '',
      cost: {},
      display: false,
      //
      //unitList DATA
      listUnits: [''],
      ready: false,
      //
      //army DATA
      displayArmy: false,
      displayArmyList: false,
      currUnit: '',
      currQuant: '',
      armyTitle: '',
      armyArr: [],
      allArmy: [],
      findTitle: "",
      findArmy: null,
      edit: false,
      del: false,
    }
  },
  async created() {
    //USER
    this.$store.dispatch("getUser");
    //army
    await this.getArmies();
    //unitInfo
    await this.aoeUnit();
    //unitList
    await this.aoeList();
  },

  computed: {
    //USER
    user() {
      return this.$store.state.user;
    },
    suggestions() {
      return this.allArmy.filter(army => army.title.toLowerCase().startsWith(this.findTitle.toLowerCase()));
    },
    //unitInfo
    relatedArr : function (){
      let related = new Array;
      if (this.cost.Wood > 0){
        let temp = {name: 'Wood', price: this.cost.Wood}
        related.push(temp);
      }
      if (this.cost.Food > 0){
        let temp = {name: 'Food', price: this.cost.Food}
        related.push(temp);
      }
      if (this.cost.Gold > 0){
        let temp = {name: 'Gold', price: this.cost.Gold}
        related.push(temp);
      }
      if (this.cost.Stone > 0){
        let temp = {name: 'Stone', price: this.cost.Stone}
        related.push(temp);
      }
      return related;
    },
    bonusArr : function (){
      let bonus = new Array;
      if (this.attackBonus == undefined){return bonus;}
      else {
        bonus.push("Attack Bonus");
        for (let i = 0; i < this.attackBonus.length; i++){
          bonus.push(this.attackBonus[i]);
        }
        return bonus;
      }
    },
    //army
    //suggestions() {
    //  return this.allArmy.filter(army => army.title.toLowerCase().startsWith(this.findTitle.toLowerCase()));
    //},
  },

  methods: {
    //USER
    async logout() {
      try {
        this.error = await this.$store.dispatch("logout");
      } catch (error) {
        console.log(error);
      }
    },
    //unitInfo methods
    async aoeUnit() {
      try {
        const response = await axios.get('https://cors-anywhere.herokuapp.com/' + 'https://age-of-empires-2-api.herokuapp.com/api/v1/unit/' + this.unitName);
        this.hp = response.data.hit_points;
        this.attack = response.data.attack;
        this.attackBonus = response.data.attack_bonus;
        this.armor = response.data.armor;
        this.cost = response.data.cost;
        this.display = true;
      } catch (error) {
        console.log(error);
      }
    },
    createUnit(){
      this.display = true;
      this.aoeUnit();
    },

    createArmy(){
      this.displayArmy = true;
    },
    //unitList
    async aoeList() {
      try {
        const response = await axios.get('https://cors-anywhere.herokuapp.com/' + 'https://age-of-empires-2-api.herokuapp.com/api/v1/units');
        for(let i = 0; i < response.data.units.length; i++){
          this.listUnits[i] = response.data.units[i].name;
        }
        this.ready = true;
      } catch (error) {
        console.log(error);
      }
    },
    //
    //army
    //
    dispArmy(){
      this.armyTitle = '';
      this.findArmy = null;
      this.displayArmyList = false;
      this.displayArmy = true;
      this.del = false;
      this.edit = false;
    },
    dispArmyList(){
      this.armyTitle = '';
      this.findArmy = null;
      this.displayArmy = false;
      this.displayArmyList = true;
      this.del = false;
      this.edit = false;
    },
    /*displayArmy(){
      return this.displayArmy;
    },
    displayArmyList1(){
      return this.displayArmyList;
    },*/
    addToArmy() {
      let newUnit = {
        unitName: this.currUnit,
        quantity: this.currQuant,
      };
      this.armyArr.push(newUnit);
      this.currUnit = '';
      this.currQuant = '';
      this.displayArmy = true;
    },
    selectArmy(army){
      this.findTitle = "";
      this.findArmy = army;
      this.armyTitle = this.findArmy.title;
      this.displayArmyList = false;
      this.del = false;
      this.edit = false;
    },
    editArmy(){
      this.edit = true;
      this.del = false;
    },
    delArmy(){
      this.del = true;
      this.edit = false;
    },
    deleteUnit(unit){
      var index = this.findArmy.units.indexOf(unit);
      if(index > -1){
        this.findArmy.units.splice(index, 1);
      }
    },
    doneWithCurrArmy(){
      this.armyTitle = '';
      this.findArmy = null;
      this.displayArmyList = true;
    },
    async postArmy(){
      try {
        this.displayArmy = false;
        let data = {
          title: this.armyTitle,
          units: this.armyArr,
        };
        await this.$store.dispatch("postArmyStore", data);
        //await axios.post('/api/armies', {
        //  title: this.armyTitle,
        //  units: this.armyArr,
        //});
        this.armyArr = [];
        this.armyTitle = '';
        this.currUnit = '';
        this.currQuant = '';
        await this.getArmies();
      } catch (error) {
        console.log(error);
      }
    },
    async getArmies(){
      try {
        await this.$store.dispatch("getArmyStore");
        //let response =  await axios.get('/api/armies');
        this.allArmy = this.$store.state.armyList;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async putArmy(army){
      try {
        let data = {
          id: army._id,
          title: this.findArmy.title,
          units: this.findArmy.units,
        };
        await this.$store.dispatch("editArmyStore", data);
        //let response = await axios.put('/api/armies/' + army._id,{
          //title: this.findArmy.title,
          //units: this.findArmy.units,
        //});
        this.findArmy = null;
        this.getArmies();
        return true;
      } catch(error){
        console.log(error);
      }
    },
    async deleteArmy(army){
      try {
        await this.$store.dispatch("deleteArmyStore", army._id);
        //let response = await axios.delete('/api/armies/' + army._id);
        this.findArmy = null;
        this.getArmies();
        return true;
      } catch(error) {
        console.log(error);
      }
    },
  },
}
</script>

<style>
#topContent{
padding-top: 30px;
padding-bottom: 20px;
}

#unitManip {
text-align: center;
display: grid;
grid-template: auto auto auto auto auto/ 1fr 2fr 1fr;
grid-column-gap: 10px;
grid-row-gap: 10px;
padding: 10px;
}

#unitList {
height: 400px;
overflow-y: scroll;
border: solid;
list-style-type: none;
font-size: 25px;
}

#singleUnit label{
font-size: 30px;
}

#singleUnitCost {
padding-left: 0px;
}

#unitResults {
text-align: center;
}

#attackBonusList {
padding-left: 0px;
}

.suggestions {
  width: 350px;
  border: 1px solid #ccc;
  margin-right: 0px;
}

.suggestion {
  min-height: 20px;
}

.suggestion:hover {
  background-color: #696969;
  color: #fff;
}

.Rbutton {
  text-decoration: none;
  font-size: 30px;
  padding: 10px;
  color: #000000;
}

.Rbutton:hover{
  text-decoration: none;
}

ul {
  list-style: none;
  padding-left: 0px;
}

li input {
  width:100px;
}

</style>
