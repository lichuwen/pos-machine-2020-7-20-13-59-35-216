function printReceipt(barcodes) {
    var uniqueItem = getUniqueItem(barcodes);
    var itemInfo = getItemInfo(uniqueItem);
    console.log(formatItem(itemInfo));
}

function formatItem(itemInfo){
    var receipt = "\n***<store earning no money>Receipt ***\n";
    // console.log(itemInfo)
    for(let item in itemInfo){
        receipt += `Name: ${itemInfo[item].name}, Quantity: ${itemInfo[item].quantity}, Unit price: ${itemInfo[item].price} (yuan), Subtotal: ${itemInfo[item].subtotal} (yuan)\n`
        // receipt += "Name: " + itemInfo[item].name + ", Quantity: " + itemInfo[item].quantity + ", Unit price: " + itemInfo[item].price + " (yuan), Subtotal: " + itemInfo[item].subtotal +" (yuan)" + '\n';
    }
    // receipt += `----------------------
    // Total: ${itemInfo[0]["total"]} (yuan)
    // **********************`
    receipt += "----------------------\n";
    receipt += "Total: " + itemInfo[0]["total"] + " (yuan)\n";
    receipt += "**********************"

    return receipt;
}

function getUniqueItem(barcodes){
    var uniqueItem = {}; 
    for(var i= 0; i<barcodes.length; i++){ 
      var item = barcodes[i]; 
      uniqueItem[item] = (uniqueItem[item] +1 ) || 1; 
    } 
    return uniqueItem; 
}

function getItemInfo(uniqueItem){
    var data = getAllItem();
    var itemInfo={};
    var barcode;
    var k = 0;
    var total = 0;
    for(let i in uniqueItem){
        barcode = i;
        itemInfo[k] = {};
        for(let j=0 ; j<data.length; j++){
            if(barcode == data[j]["barcode"]){
                itemInfo[k]["name"] = data[j]["name"];  
                itemInfo[k]["price"] = data[j]["price"];
                itemInfo[k]["quantity"] = uniqueItem[barcode];
                itemInfo[k]["subtotal"] = data[j]["price"] * uniqueItem[barcode]; 
                total += itemInfo[k]["subtotal"];
            }
        }
        k++; 
    }  
    itemInfo[0]["total"] = total;
    return itemInfo; 
}

function getAllItem(){
    return json = [
        {
           barcode: 'ITEM000000',
           name: 'Coca-Cola',
           price: 3
         },
         {
           barcode: 'ITEM000001',
           name: 'Sprite',
           price: 3
         },
         {
           barcode: 'ITEM000002',
           name: 'Apple',
           price: 5
         },
         {
           barcode: 'ITEM000003',
           name: 'Litchi',
           price: 15
         },
         {
           barcode: 'ITEM000004',
           name: 'Battery',
           price: 2
         },
         {
           barcode: 'ITEM000005',
           name: 'Instant Noodles',
           price: 4
         }
     ]
}


module.exports = {
    printReceipt
};