#include <iostream>
#include <fstream>
#include <string>
#include <filesystem>

using namespace std;

int main(){
    string file_num = "5";
    string dest_data;
    string target_file;
    string dest_file;
    string S,C;
    int count =0;

    dest_data = "/mnt/c/users/mizuc/Desktop/game/Ability Montage/button/";
    for(int s=0;s<56;++s){
        count =0;
        file_num = to_string(s);
        S = std::string(std::max(0, 4-(int)file_num.size()), '0') + file_num;
        target_file = dest_data+S+"_"+file_num+".png";
        C = std::string(std::max(0, 2-(int)file_num.size()), '0') + file_num;
        dest_file = dest_data+C+".png";
        filesystem::rename(target_file, dest_file);
    }
    
    return 0;
}