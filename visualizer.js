class Visualizer{
    static drawNetwork(ctx,network){
        const margin = 50;
        const left = margin;
        const top = margin;
        const width =ctx.canvas.width-margin*2;
        const height = ctx.canvas.height -margin*2;

        const levelHeight = height/network.levels.length;
//to draw the netwok from top to bottom
        for(let i=network.levels.length-1;i>=0;i--){
            const levelTop = top +
                    lerp(
                        height-levelHeight,
                        0,
                        network.levels.length ==1 
                        ?0.5
                        :i/(network.levels.length-1)
                    );
        ctx.setLineDash([7,3]);
        Visualizer.drawLevel(ctx, network.levels[i],
            left,levelTop,
            width,levelHeight,
            i==network.levels.length-1
            ?['↑','←','→','↓']
            :[]
        );

        }

    }



    static drawLevel(ctx,level,left,top,width,height, outputLables){
        const right = left+width;
        const bottom = top+height;
        
        const{inputs,outputs,weigths,baises} =level;
//this is the connection 
        for(let i=0;i<inputs.length;i++){
            for(let j=0;j<outputs.length;j++){
                ctx.beginPath();
                ctx.moveTo(
                    Visualizer.#getNodeX(inputs,i,left,right) , bottom
                );
                ctx.lineTo(
                    Visualizer.#getNodeX(outputs,j,left,right) ,top
                );
                ctx.lineWidth =2;
                
                ctx.strokeStyle =getRGBA(weigths[i][j]);
                ctx.stroke();
            }

        }


// this is the input level 
        const nodeRadius = 18;
        for(let i=0;i<inputs.length;i++){
            const x =Visualizer.#getNodeX(inputs,i,left,right);
            //for visual clarity 
            ctx.beginPath();
            ctx.arc(x,bottom,nodeRadius,0,Math.PI*2);
            ctx.fillStyle ="black"; 
            ctx.fill();
            //actual circle 
            ctx.beginPath();
            ctx.arc(x,bottom,nodeRadius*0.7,0,Math.PI*2);
            ctx.fillStyle =getRGBA(inputs[i]);
            ctx.fill();
        }
// this is the output (3rd) level 
        for(let i=0;i<outputs.length;i++){
            const x = Visualizer.#getNodeX(outputs,i,left,right);
            //for visual clarity 
            ctx.beginPath();
            ctx.arc(x,top,nodeRadius,0,Math.PI*2);
            ctx.fillStyle ="black";
            ctx.fill();
            //actual circle
            ctx.beginPath();
            ctx.arc(x,top,nodeRadius*0.7,0,Math.PI*2);
            ctx.fillStyle =getRGBA(outputs[i]);
            ctx.fill();

            ctx.beginPath();
            ctx.lineWidth = 2;
            ctx.arc(x,top,nodeRadius,0,Math.PI*2);
            ctx.strokeStyle=getRGBA(baises[i]);
            ctx.setLineDash([3,3]);
            ctx.stroke();
            ctx.setLineDash([]);



            if(outputLables[i]){
                ctx.beginPath();
                ctx.textAlign ="center";
                ctx.textBaseline="middle";
                ctx.fillStyle ="white";
                ctx.strokeStyle="white";
                ctx.font=(nodeRadius*1.3)+"px Garamond";
                ctx.fillText(outputLables[i],x,top);
                ctx.lineWidth=0.5;
                ctx.strokeText(outputLables[i],x,top);

            }
        }



    }


    static #getNodeX(nodes,index,left,right){
        return lerp(
            left,
            right,
            nodes.length == 1
            ?0.5: index/(nodes.length-1)  
        );
    }

}