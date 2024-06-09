#include <iostream>
#include <fstream>
#include <string>
#include <filesystem>

using namespace std;

int main(){
    string num;
    string dest_data;

    dest_data = "/mnt/c/users/mizuc/Desktop/game/Ability Montage/trial/images/";

    for(int i=9;i<56;++i){
        num = to_string(i);
        filesystem::create_directories(dest_data+num);
    }
    return 0;
}