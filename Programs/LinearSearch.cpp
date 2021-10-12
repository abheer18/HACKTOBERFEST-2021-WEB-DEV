// C++ Program to implement Linear Search
 
#include <iostream>
using namespace std;
   
int main(){
    int num_elements, arr[num_elements], i, n;
       
    cout << "Enter Number of Elements in Array\n";
    cin >> num_elements;
     
    cout << "Enter " << num_elements << " numbers \n";
      
    // Read array elements
    for(i = 0; i < num_elements; i++){
        cin >> arr[i];
    }
      
    cout << "Enter a number to serach in Array\n";
    cin >> n;
      
    // search num in inputArray from index 0 to elementCount-1 
    for(i = 0; i < num_elements; i++){
        if(arr[i] == n){
            cout << "Element found at index " << i;
            break;
        }
    }
      
    if(i == num_elements){
        cout  << "Element Not Present in Input Array\n";
    }
 
    return 0;
}