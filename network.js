class NeuralNetwork{
    constructor(neuronCount){
        this.levels=[];
        for(let i=0;i<neuronCount.length-1;i++){
            this.levels.push(new Level(
                neuronCount[i],neuronCount[i+1]
            ));
        }
    }

    static feedForward(givenInput,network){
        let outputs =Level.feedForward(
            givenInput,network.levels[0]
        );
        for(let i=1;i<network.levels.length;i++){
            outputs =Level.feedForward(
                outputs,network.levels[i]
            );
        }
        return outputs;
    }

    static mutate(netwok,amount=1){
        netwok.levels.forEach(level => {
            for(let i=0;i<level.baises.length;i++){
                level.baises[i]= lerp(
                    level.baises[i],
                    Math.random()*2-1,
                    amount
                )
            }
            for(let i=0;i<level.weigths.length;i++){
                for(let j=0;j<level.weigths[i].length;j++){
                    level.weigths[i][j]=lerp(
                        level.weigths[i][j],
                        Math.random()*2-1,
                        amount
                    )
                }
            }
        });
    }
} 




class Level{
    constructor(inputCount,outputCount){
        this.inputs= new Array(inputCount);
        this.outputs= new Array(outputCount);
        this.baises = new Array(outputCount);

        this.weigths = [];
        for(let i=0;i<inputCount;i++){
            this.weigths[i]=new Array(outputCount);
        }
        Level.#randomize(this);

    }

    static #randomize(level){
        for (let i=0;i<level.inputs.length;i++){
            for(let j=0;j<level.outputs.length;j++){
                level.weigths[i][j]=Math.random()*2-1;
            }
        }

        for(let i=0;i<level.baises.length;i++){
            level.baises[i]=Math.random()*2-1;
        }
    }

    static feedForward(givenInput,level){
        for(let i=0;i<level.inputs.length;i++){
            level.inputs[i]=givenInput[i];
        }

        for(let i=0;i<level.outputs.length;i++){
            let sum=0
            for(let j=0;j<level.inputs.length;j++){
                sum+=level.inputs[j]*level.weigths[j][i];
            }
            if(sum>level.baises[i]){
                level.outputs[i]=1;
            }
            else{
                level.outputs[i]=0;
            }
        }

        return level.outputs;
    }
}