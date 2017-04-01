function Stitch(type){
     this.type = type;
     this.stitch =[];
     this.create();
}
Stitch.prototype.create =function(){
    switch(this.type){
      case '-': {                         // overslaan naar rechts
        this.stitch[0] = new Pos(0,0,0,0);
        this.stitch[1] = new Pos(1,0,0,0);
        this.stitch[2] = new Pos(2,1,0,0);
        this.stitch[3] = new Pos(3,1,0,0);
        this.stitch[4] = new Pos(4,0,0,0);
        break;
       }
       case '_': {                         // overslaan naar links
         this.stitch[0] = new Pos(0,0,0,0);
         this.stitch[1] = new Pos(-1,1,0,0);
         this.stitch[2] = new Pos(-2,1,0,0);
         this.stitch[3] = new Pos(-3,0,0,0);
         this.stitch[4] = new Pos(-4,0,0,0);
       break;
      }
       case '+': {                         // 1 plat
         this.stitch[0] = new Pos(0,0,0,0);
         this.stitch[1] = new Pos(0,1,0,2);

        break;
       }
        case '1': {                         // 1 bol
        this.stitch[0] = new Pos(0,0,0,0);
        this.stitch[1] = new Pos(2,1,0,2);
        this.stitch[2] = new Pos(0,2,0,2);
        this.stitch[3] = new Pos(0,1,0,2);

        break;
       }
        case '2': {                         // 2 driehoekjes
        this.stitch[0] = new Pos(0,0,0,0);
        this.stitch[1] = new Pos(0,2,0,0);
        this.stitch[2] = new Pos(2,1,0,0);
        this.stitch[3] = new Pos(2,3,0,0);
        this.stitch[4] = new Pos(0,2,0,0);

        break;
        }
        case '3': {                         // 3 steek
        this.stitch[0] = new Pos(0,0,0,0);
        this.stitch[1] = new Pos(0,1,0,0);
        this.stitch[2] = new Pos(1,2,0,0);
        this.stitch[3] = new Pos(2,2,0,0);
        this.stitch[4] = new Pos(3,1,0,0);
        this.stitch[5] = new Pos(4,1,0,0);
        this.stitch[6] = new Pos(5,2,0,0);
        this.stitch[7] = new Pos(5,3,0,0);
        this.stitch[8] = new Pos(4,4,0,0);
        this.stitch[9] = new Pos(3,4,0,0);
        this.stitch[10] = new Pos(2,3,0,0);
        this.stitch[11] = new Pos(1,3,0,0);
        this.stitch[12] = new Pos(0,4,0,0);

        break;
       }
       case '4': {                         //4 steek
        this.stitch[0] = new Pos(0,0,0,0);
        this.stitch[1] = new Pos(0,0,0,0);
        this.stitch[2] = new Pos(0,1,0,0);
        this.stitch[3] = new Pos(0,1,0,0);
        this.stitch[4] = new Pos(0,2,0,0);
         break;
       }
       case '5': {                         //5 boogje
        this.stitch[0] = new Pos(0,0,0,0);
        this.stitch[1] = new Pos(0,2,0,0);
        this.stitch[2] = new Pos(0,4,0,0);
        this.stitch[3] = new Pos(0,6,0,0);


         break;
       }
        case '6': {                         //6 hoger boogje
        this.stitch[0] = new Pos(0,1,0,0);
        this.stitch[1] = new Pos(0,2,0,0);

         break;
       }
        case 'A': {             //ok            //R opzetten naar rechts, eerste steek
        this.stitch[0] = new Pos(0,0,1,0);
        //this.stitch[1] = new Pos(0,3,0,0);
        this.stitch[1] = new Pos(0,3,1,0);
        this.stitch[2] = new Pos(3,4,1,0);
        this.stitch[3] = new Pos(3,6,1,0);
        this.stitch[4] = new Pos(2,7,1,0);
        this.stitch[5] = new Pos(1,7,1,0);
        this.stitch[6] = new Pos(0,6,1,0);
        this.stitch[7] = new Pos(0,5,1,0);
        this.stitch[8] = new Pos(3,3,1,0);
        this.stitch[9] = new Pos(4,3,1,0);

        break;
       }
       case 'B': {            //ok             //R opzetten naar rechts
         this.stitch[0] = new Pos(0,3,1,0);
         this.stitch[1] = new Pos(1,3,1,0);
         this.stitch[2] = new Pos(3,4,1,0);
         this.stitch[3] = new Pos(3,6,1,0);
         this.stitch[4] = new Pos(2,7,1,0);
         this.stitch[5] = new Pos(1,7,1,0);
         this.stitch[6] = new Pos(0,6,1,0);
         this.stitch[7] = new Pos(0,4,1,0);
         this.stitch[8] = new Pos(3,3,1,0);
         this.stitch[9] = new Pos(4,3,1,0);
        break;
       }
       case 'C': {             //ok            //R opzetten naar rechts, laatste steek
         this.stitch[0] = new Pos(0,3,1,0);
         this.stitch[1] = new Pos(0,3,1,0);
         this.stitch[2] = new Pos(3,4,1,0);
         this.stitch[3] = new Pos(3,6,1,0);
         this.stitch[4] = new Pos(2,7,1,0);
         this.stitch[5] = new Pos(1,7,1,0);
         this.stitch[6] = new Pos(0,6,1,0);
         this.stitch[7] = new Pos(0,4,1,0);
         this.stitch[8] = new Pos(3,3,1,0);
         this.stitch[9] = new Pos(4,3,1,0);
         this.stitch[10] = new Pos(4,4,1,0);

        break;
       }
       case 'D': {            // ok            //R opzetten naar rechts, eerste steek
         this.stitch[0] = new Pos(0,0,1,0);
         this.stitch[1] = new Pos(-1,0,1,0);
         this.stitch[2] = new Pos(-4,3,1,0);
         this.stitch[3] = new Pos(-4,5,1,0);
         this.stitch[4] = new Pos(-3,6,1,0);
         this.stitch[5] = new Pos(-2,6,1,0);
         this.stitch[6] = new Pos(-1,5,1,0);
         this.stitch[7] = new Pos(-1,3,1,0);
         this.stitch[8] = new Pos(-4,0,1,0);

       break;
      }
      case 'E': {               //ok          //R opzetten naar rechts
        this.stitch[0] = new Pos(0,0,1,0);
        this.stitch[1] = new Pos(-1,0,1,0);
        this.stitch[2] = new Pos(-4,3,1,0);
        this.stitch[3] = new Pos(-4,5,1,0);
        this.stitch[4] = new Pos(-3,6,1,0);
        this.stitch[5] = new Pos(-2,6,1,0);
        this.stitch[6] = new Pos(-1,5,1,0);
        this.stitch[7] = new Pos(-1,3,1,0);
        this.stitch[8] = new Pos(-4,0,1,0);
        this.stitch[9] = new Pos(-5,0,1,0);
       break;
      }
      case 'F': {               //ok          //R opzetten naar rechts, laatste steek
        this.stitch[0] = new Pos(0,0,1,0);
        this.stitch[1] = new Pos(-1,0,1,0);
        this.stitch[2] = new Pos(-4,3,1,0);
        this.stitch[3] = new Pos(-4,5,1,0);
        this.stitch[4] = new Pos(-3,6,1,0);
        this.stitch[5] = new Pos(-2,6,1,0);
        this.stitch[6] = new Pos(-1,5,1,0);
        this.stitch[7] = new Pos(-1,3,1,0);
        this.stitch[8] = new Pos(-4,0,1,0);
        this.stitch[9] = new Pos(-5,0,1,0);
        this.stitch[10] = new Pos(-5,1,1,0);
        this.stitch[11] = new Pos(-4,1,1,0);


       break;
      }
       case 'D1': {                         //L afhechten, eerste steek, intern
        this.stitch[0] = new Pos(0,0,0,0);
        this.stitch[1] = new Pos(-1,1,0,0);
        this.stitch[2] = new Pos(0,3,0,0);
        this.stitch[3] = new Pos(-2,3,0,0);
        this.stitch[4] = new Pos(-5,1,0,0);
        this.stitch[5] = new Pos(-4,0,0,0);
        this.stitch[6] = new Pos(-3,0,0,0);
        this.stitch[7] = new Pos(-2,1,0,0);
        this.stitch[8] = new Pos(-5,3,0,0);


        break;
       }
       case 'E1': {                         //R afhechten naar rechts intern
        this.stitch[0] = new Pos(0,0,0,0);
        this.stitch[1] = new Pos(-1,0,0,0);
        this.stitch[2] = new Pos(-4,-2,0,0);
        this.stitch[3] = new Pos(-3,-3,0,0);
        this.stitch[4] = new Pos(-2,-3,0,0);
        this.stitch[5] = new Pos(-1,-2,0,0);
        this.stitch[6] = new Pos(-4,0,0,0);
        break;
       }
       case 'G1': {                         //laatste afhechten naar rechts intern
        this.stitch[0] = new Pos(0,0,0,0);
      //  this.stitch[1] = new Pos(-1,0,0,2);
      //  this.stitch[2] = new Pos(-4,-2,0,2);
        //this.stitch[3] = new Pos(-3,-3,0,1);
        //this.stitch[4] = new Pos(-2,-3,0,1);
        //this.stitch[5] = new Pos(-1,-2,0,1);
        this.stitch[1] = new Pos(-2,0,0,0);
        this.stitch[2] = new Pos(-1,-2,0,0);
        this.stitch[3] = new Pos(-2,-3,0,0);
        this.stitch[4] = new Pos(-3,-3,0,0);
      //  this.stitch[8] = new Pos(-6,-1,0,2);
      //  this.stitch[9] = new Pos(-5,-2,0,2);
      //  this.stitch[10] = new Pos(-6,-3,0,2);
        break;
       }
       case 'I': {                         //eerste afhechten naar rechts intern
        this.stitch[0] = new Pos(0,0,0,0);
        this.stitch[1] = new Pos(1,0,0,0);
        this.stitch[2] = new Pos(4,3,0,0);
        this.stitch[3] = new Pos(3,4,0,0);
        this.stitch[4] = new Pos(2,4,0,0);
        this.stitch[5] = new Pos(1,3,0,0);
        this.stitch[6] = new Pos(4,1,0,0);
        break;
       }
       case 'H': {                         //afhechten naar rechts intern
        this.stitch[0] = new Pos(0,0,0,0);
        this.stitch[1] = new Pos(1,0,0,0);
        this.stitch[2] = new Pos(4,2,0,0);
        this.stitch[3] = new Pos(3,3,0,0);
        this.stitch[4] = new Pos(2,3,0,0);
        this.stitch[5] = new Pos(1,2,0,0);
        this.stitch[6] = new Pos(4,0,0,0);
        break;
       }
       case 'J': {                         //laatste afhechten naar rechts intern
         this.stitch[0] = new Pos(0,0,0,0);
         this.stitch[1] = new Pos(1,0,0,0);
         this.stitch[2] = new Pos(2,0,0,0);
         this.stitch[3] = new Pos(4,2,0,0);
         this.stitch[4] = new Pos(3,3,0,0);
         this.stitch[5] = new Pos(2,3,0,0);
         this.stitch[6] = new Pos(1,2,0,0);
         this.stitch[7] = new Pos(4,-1,0,0);//4

        break;
       }

       case 'R': {          //OK               //R naar rechts
         this.stitch[0] = new Pos(0,0,1,0);
         this.stitch[1] = new Pos(1,1,1,0);
         this.stitch[2] = new Pos(1,3,1,0);
         this.stitch[3] = new Pos( 0,4,1,0);
         this.stitch[4] = new Pos( 0,6,1,0);
         this.stitch[5] = new Pos(1,7,1,0);
         this.stitch[6] = new Pos(2,7,1,0);
         this.stitch[7] = new Pos(3,6,1,0);
         this.stitch[8] = new Pos(3,4,1,0);
         this.stitch[9] = new Pos(2,3,1,0);
         this.stitch[10] = new Pos(2,1,1,0);
         this.stitch[11] = new Pos(3,0,1,0);
         this.stitch[12] = new Pos(4,0,1,0);
        break;
       }
       case 'S': {         //OK                //R laatste rechts
         this.stitch[0] = new Pos(0,0,1,0);
         this.stitch[1] = new Pos(1,1,1,0);
         this.stitch[2] = new Pos(1,3,1,0);
         this.stitch[3] = new Pos( 0,4,1,0);
         this.stitch[4] = new Pos( 0,6,1,0);
         this.stitch[5] = new Pos(1,7,1,0);
         this.stitch[6] = new Pos(2,7,1,0);
         this.stitch[7] = new Pos(3,6,1,0);
         this.stitch[8] = new Pos(3,4,1,0);
         this.stitch[9] = new Pos(2,3,1,0);
         this.stitch[10] = new Pos(2,1,1,0);
         this.stitch[11] = new Pos(3,0,1,0);
         this.stitch[12] = new Pos(4,0,1,0);
         this.stitch[13] = new Pos(4,4,1,0);
        break;
       }
        case 'L': {    //ok                     //R naar links
        this.stitch[0] = new Pos(0,0,1,0);
        this.stitch[1] = new Pos(-1,0,1,0);
        this.stitch[2] = new Pos(-2,1,1,0);
        this.stitch[3] = new Pos(-2,3,1,0);
        this.stitch[4] = new Pos(-1,4,1,0);
        this.stitch[5] = new Pos(-1,6,1,0);
        this.stitch[6] = new Pos(-2,7,1,0);
        this.stitch[7] = new Pos(-3,7,1,0);
        this.stitch[8] = new Pos(-4,6,1,0);
        this.stitch[9] = new Pos(-4,4,1,0);
        this.stitch[10] = new Pos(-3,3,1,0);
        this.stitch[11] = new Pos(-3,1,1,0);
        this.stitch[12] = new Pos(-4,0,1,0);
        //this.stitch[13] = new Pos(-5,0,0,0);

        break;
       }
       case 'K': {      //OK                 //R laatste links
         this.stitch[0] = new Pos(0,0,1,0);
         this.stitch[1] = new Pos(-1,0,1,0);
         this.stitch[2] = new Pos(-2,1,1,0);
         this.stitch[3] = new Pos(-2,3,1,0);
         this.stitch[4] = new Pos(-1,4,1,0);
         this.stitch[5] = new Pos(-1,6,1,0);
         this.stitch[6] = new Pos(-2,7,1,0);
         this.stitch[7] = new Pos(-3,7,1,0);
         this.stitch[8] = new Pos(-4,6,1,0);
         this.stitch[9] = new Pos(-4,4,1,0);
         this.stitch[10] = new Pos(-3,3,1,0);
         this.stitch[11] = new Pos(-3,1,1,0);
         this.stitch[12] = new Pos(-4,0,1,0);
         this.stitch[13] = new Pos(-5,0,1,0);
         this.stitch[14] = new Pos(-5,4,1,0);
         this.stitch[15] = new Pos(-4,4,1,0);
        break;
       }
       case 'M': {                         //R afhechten, eerste steek
        this.stitch[0] = new Pos(0,0,0,0);
        this.stitch[1] = new Pos(1,0,0,0);
        this.stitch[2] = new Pos(2,1,0,0);
        this.stitch[3] = new Pos(1,2,0,0);
        this.stitch[4] = new Pos(2,3,0,0);

        break;
       }
       case 'O': {                         //laatste afhechten naar rechts intern
        this.stitch[0] = new Pos(0,0,0,0);
        this.stitch[1] = new Pos(1,0,0,0);
        this.stitch[2] = new Pos(4,-2,0,0);
        this.stitch[3] = new Pos(3,-3,0,0);
        this.stitch[4] = new Pos(2,-3,0,0);
        this.stitch[5] = new Pos(1,-2,0,0);
        this.stitch[6] = new Pos(4,0,0,0);
        this.stitch[7] = new Pos(5,0,0,0);
        this.stitch[8] = new Pos(6,-1,0,0);
        this.stitch[9] = new Pos(5,-2,0,0);
        this.stitch[10] = new Pos(6,-3,0,0);
        break;
       }
       case 'P': {                         //eerste afhechten naar links intern
        this.stitch[0] = new Pos(0,0,0,0);
        this.stitch[1] = new Pos(0,1,0,0);
        this.stitch[2] = new Pos(-3,3,0,0);
        this.stitch[3] = new Pos(-2,4,0,0);
        this.stitch[4] = new Pos(-1,4,0,0);
        this.stitch[5] = new Pos(0,3,0,0);
        this.stitch[6] = new Pos(-3,1,0,0);
        break;
       }
       case 'Q': {                         //afhechten naar links intern
        this.stitch[0] = new Pos(0,0,0,0);
        this.stitch[1] = new Pos(-1,0,0,0);
        this.stitch[2] = new Pos(-4,2,0,0);
        this.stitch[3] = new Pos(-3,3,0,0);
        this.stitch[4] = new Pos(-2,3,0,0);
        this.stitch[5] = new Pos(-1,2,0,0);
        this.stitch[6] = new Pos(-4,0,0,0);
        break;
       }
       case 'T': {                         //laatste afhechten naar links intern
        this.stitch[0] = new Pos(0,0,0,0);
        this.stitch[1] = new Pos(-1,0,0,0);
        this.stitch[2] = new Pos(-4,2,0,0);
        this.stitch[3] = new Pos(-3,3,0,0);
        this.stitch[4] = new Pos(-2,3,0,0);
        this.stitch[5] = new Pos(-1,2,0,0);
        this.stitch[6] = new Pos(-4,0,0,0);
        this.stitch[7] = new Pos(-4,-1,0,0);
        this.stitch[8] = new Pos(-5,-1,0,0);
        break;
       }
       case 'U': {                 //ok        //naar links afhechten, eerste steek
         this.stitch[0] = new Pos(0,0,1,0);
         this.stitch[1] = new Pos(-1,0,1,0);
         this.stitch[2] = new Pos(-2,1,1,0);
         this.stitch[3] = new Pos(-2,3,1,0);
         this.stitch[4] = new Pos(-1,4,1,0);
         this.stitch[5] = new Pos(-2,4,1,0);

        break;
       }
       case 'V': {                 //ok        // afhechten naar links
         //this.stitch[0] = new Pos(2,4,1,0);
         this.stitch[0] = new Pos(1,4,1,0);
         this.stitch[1] = new Pos(-2,3,1,0);
         this.stitch[2] = new Pos(-2,1,1,0);
         this.stitch[3] = new Pos(-1,0,1,0);
         this.stitch[4] = new Pos(0,0,1,0);
         this.stitch[5] = new Pos(1,1,1,0);
         this.stitch[6] = new Pos(1,3,1,0);
         this.stitch[7] = new Pos(-2,4,1,0);
         this.stitch[8] = new Pos(-3,4,1,0);
        break;
       }
       case 'W': {                //ok         //naar links afhechten, laatste steek
         this.stitch[0] = new Pos(1,4,1,0);
         this.stitch[1] = new Pos(-2,3,1,0);
         this.stitch[2] = new Pos(-2,1,1,0);
         this.stitch[3] = new Pos(-1,0,1,0);
         this.stitch[4] = new Pos(0,0,1,0);
         this.stitch[5] = new Pos(1,1,1,0);
         this.stitch[6] = new Pos(1,3,1,0);
         this.stitch[7] = new Pos(-2,4,1,0);
         this.stitch[8] = new Pos(-3,4,1,0);
         this.stitch[9] = new Pos(-5,3,1,0);
         this.stitch[10] = new Pos(-5,0,1,0);
         this.stitch[11] = new Pos(-4,0,1,0);
         this.stitch[12] = new Pos(-3,1,1,0);
         this.stitch[13] = new Pos(-3,3,1,0);
         this.stitch[14] = new Pos(-5,4,1,0);

        break;
       }
       case 'X': {              //OK           //R afhechten, eerste steek
         this.stitch[0] = new Pos(0,0,1,0);
         this.stitch[1] = new Pos(1,1,1,0);
         this.stitch[2] = new Pos(1,3,1,0);
         this.stitch[3] = new Pos(0,4,1,0);
         this.stitch[4] = new Pos(1,4,1,0);
         this.stitch[5] = new Pos(2,4,1,0);

        break;
       }
       case 'Y': {            //OK             //R afhechten naar rechts
         this.stitch[0] = new Pos(0,0,1,0);
         this.stitch[1] = new Pos(3,-1,1,0);
         this.stitch[2] = new Pos(3,-3,1,0);
         this.stitch[3] = new Pos(2,-4,1,0);
         this.stitch[4] = new Pos(1,-4,1,0);
         this.stitch[5] = new Pos(0,-3,1,0);
         this.stitch[6] = new Pos(0,-1,1,0);
         this.stitch[7] = new Pos(3,0,1,0);
         this.stitch[8] = new Pos(4,0,1,0);
        break;
       }
       case 'Z': {          //OK               //R afhechten, laatste steek
         this.stitch[0] = new Pos(0,0,1,0);
         this.stitch[1] = new Pos(3,-1,1,0);
         this.stitch[2] = new Pos(3,-3,1,0);
         this.stitch[3] = new Pos(2,-4,1,0);
         this.stitch[4] = new Pos(1,-4,1,0);
         this.stitch[5] = new Pos(0,-3,1,0);
         this.stitch[6] = new Pos(0,-1,1,0);
         this.stitch[7] = new Pos(3,0,1,0);
         this.stitch[8] = new Pos(4,0,1,0);
         this.stitch[9] = new Pos(6,-1,1,0);
         this.stitch[10] = new Pos(6,-4,1,0);
         this.stitch[11] = new Pos(5,-4,1,0);
         this.stitch[12] = new Pos(4,-3,1,0);
         this.stitch[13] = new Pos(4,-1,1,0);
         this.stitch[14] = new Pos(6,0,1,0);

        break;
       }
  case 'a': {                         //R opzetten naar rechts, eerste steek
        this.stitch[0] = new Pos(0,0,0,0);
        this.stitch[1] = new Pos(1,0,0,0);
        this.stitch[2] = new Pos(4,2,0,0);
        this.stitch[3] = new Pos(3,3,0,0);
        this.stitch[4] = new Pos(2,3,0,0);
        this.stitch[5] = new Pos(1,2,0,0);
        this.stitch[6] = new Pos(4,0,0,0);
        break;
       }
       case 'b': {                         //R opzetten naar rechts
        this.stitch[0] = new Pos(0,0,0,0);
        this.stitch[1] = new Pos(1,0,0,0);
        this.stitch[2] = new Pos(4,2,0,0);
        this.stitch[3] = new Pos(3,3,0,0);
        this.stitch[4] = new Pos(2,3,0,0);
        this.stitch[5] = new Pos(1,2,0,0);
        this.stitch[6] = new Pos(4,0,0,0);
        break;
       }
       case 'c': {                         //R opzetten naar rechts, laatste steek
        this.stitch[0] = new Pos(0,0,0,0);
        this.stitch[1] = new Pos(1,0,0,0);
        this.stitch[2] = new Pos(4,2,0,0);
        this.stitch[3] = new Pos(3,3,0,0);
        this.stitch[4] = new Pos(2,3,0,0);
        this.stitch[5] = new Pos(1,2,0,0);
        this.stitch[6] = new Pos(4,0,0,0);
        this.stitch[7] = new Pos(5,0,0,0);
        this.stitch[8] = new Pos(5,1,0,0);
        this.stitch[9] = new Pos(4,1,0,0);

        break;
       }

       case 'r': {                         //R naar rechts
        this.stitch[0] = new Pos(0,0,0,0);
        this.stitch[1] = new Pos(1,0,0,0);
        this.stitch[2] = new Pos(2,1,0,0);
        this.stitch[3] = new Pos(1,3,0,0);
        this.stitch[4] = new Pos(2,4,0,0);
        this.stitch[5] = new Pos(3,4,0,0);
        this.stitch[6] = new Pos(4,3,0,0);
        this.stitch[7] = new Pos(3,1,0,0);
        this.stitch[8] = new Pos(4,0,0,0);
        break;
       }
       case 's': {                         //R laatste rechts
        this.stitch[0] = new Pos(0,0,0,0);
        this.stitch[1] = new Pos(1,0,0,0);
        this.stitch[2] = new Pos(2,1,0,0);
        this.stitch[3] = new Pos(1,3,0,0);
        this.stitch[4] = new Pos(2,4,0,0);
        this.stitch[5] = new Pos(3,4,0,0);
        this.stitch[6] = new Pos(4,3,0,0);
        this.stitch[7] = new Pos(3,1,0,0);
        this.stitch[8] = new Pos(4,0,0,0);
        this.stitch[9] = new Pos(5,0,0,0);
        this.stitch[10] = new Pos(5,2,0,0);
        this.stitch[11] = new Pos(4,2,0,0);
        break;
       }
        case 'l': {                         //R naar links
        this.stitch[0] = new Pos(0,0,0,0);
        this.stitch[1] = new Pos(-1,1,0,0);
        this.stitch[2] = new Pos(0,3,0,0);
        this.stitch[3] = new Pos(-1,4,0,0);
        this.stitch[4] = new Pos(-2,4,0,0);
        this.stitch[5] = new Pos(-3,3,0,0);
        this.stitch[6] = new Pos(-2,1,0,0);
        this.stitch[7] = new Pos(-3,0,0,0);
        this.stitch[8] = new Pos(-4,0,0,0);
        break;
       }
       case 'k': {                         //R laatste links
        this.stitch[0] = new Pos(0,0,0,0);
        this.stitch[1] = new Pos(-1,1,0,0);
        this.stitch[2] = new Pos(0,3,0,0);
        this.stitch[3] = new Pos(-1,4,0,0);
        this.stitch[4] = new Pos(-2,4,0,0);
        this.stitch[5] = new Pos(-3,3,0,0);
        this.stitch[6] = new Pos(-2,1,0,0);
        this.stitch[7] = new Pos(-3,0,0,0);
        this.stitch[8] = new Pos(-4,0,0,0);
        this.stitch[9] = new Pos(-4,2,0,0);
        break;
       }
        case 'u': {                         //R afhechten, laatste steek links
        this.stitch[0] = new Pos(0,0,0,0);
        this.stitch[1] = new Pos(-1,0,0,0);
        this.stitch[2] = new Pos(-3,-2,0,0);
        this.stitch[3] = new Pos(-3,-3,0,0);
        this.stitch[4] = new Pos(-2,-3,0,0);
        this.stitch[5] = new Pos(-1,-2,0,0);
        this.stitch[6] = new Pos(-3,0,0,0);
        break;
       }

       case 'v': {                         //R afhechten naar links
        this.stitch[0] = new Pos(0,0,0,0);
        this.stitch[1] = new Pos(-1,0,0,0);
        this.stitch[2] = new Pos(-4,-2,0,0);
        this.stitch[3] = new Pos(-3,-3,0,0);
        this.stitch[4] = new Pos(-2,-3,0,0);
        this.stitch[5] = new Pos(-1,-2,0,0);
        this.stitch[6] = new Pos(-4,0,0,0);
        break;
       }
      case 'w': {                         //R afhechten, eerste steek naar links
        this.stitch[0] = new Pos(0,0,0,0);
        this.stitch[1] = new Pos(-1,1,0,0);
        this.stitch[2] = new Pos(0,2,0,0);
        this.stitch[3] = new Pos(-1,3,0,0);

        break;
       }
       case 'x': {                         //R afhechten, eerste steek
        this.stitch[0] = new Pos(0,0,0,0);
        this.stitch[1] = new Pos(1,0,0,0);
        this.stitch[2] = new Pos(2,1,0,0);
        this.stitch[3] = new Pos(0,2,0,0);
        this.stitch[4] = new Pos(1,3,0,0);
        this.stitch[5] = new Pos(2,3,0,0);
        break;
       }
       case 'y': {                         //R afhechten naar rechts
        this.stitch[0] = new Pos(0,0,0,0);
        this.stitch[1] = new Pos(1,0,0,0);
        this.stitch[2] = new Pos(4,-2,0,0);
        this.stitch[3] = new Pos(3,-3,0,0);
        this.stitch[4] = new Pos(2,-3,0,0);
        this.stitch[5] = new Pos(1,-2,0,0);
        this.stitch[6] = new Pos(4,0,0,0);
        break;
       }
       case 'z': {                         //R afhechten, laatste steek
        this.stitch[0] = new Pos(0,0,0,0);
        this.stitch[1] = new Pos(1,0,0,0);
        this.stitch[2] = new Pos(3,-1,0,0);
        this.stitch[3] = new Pos(3,-3,0,0);
        this.stitch[4] = new Pos(2,-3,0,0);
        this.stitch[5] = new Pos(1,-2,0,0);
        this.stitch[6] = new Pos(3,0,0,0);
        break;
       }
     }
  }
