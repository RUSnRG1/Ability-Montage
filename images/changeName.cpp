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

    dest_data = "/mnt/c/users/mizuc/Desktop/game/Ability Montage/trial/images/";
    int count =0;
    for(int i=0;i<20;++i){
        S = std::to_string(i);
        S = std::string(std::max(0, 2-(int)S.size()), '0') + S;
        target_file = dest_data+file_num+"/"+S+".gif";
        C = std::to_string(count);
        C = std::string(std::max(0, 2-(int)C.size()), '0') + C;
        dest_file = dest_data+file_num+"/"+C+".gif";
        cout << S << ":   " << C << endl;
        try{
            filesystem::rename(target_file, dest_file);
            ++count;
        }
        catch(filesystem::filesystem_error){
            
        }
    }
    return 0;
}