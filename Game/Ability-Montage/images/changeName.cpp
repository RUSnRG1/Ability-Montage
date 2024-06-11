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

    dest_data = "/mnt/c/users/mizuc/Desktop/game/Ability Montage/images/";
    for(int s=0;s<56;++s){
        count =0;
        file_num = to_string(s);
        for(int i=0;i<20;++i){
            S = std::to_string(i);
            S = std::string(std::max(0, 2-(int)S.size()), '0') + S;
            target_file = dest_data+file_num+"/"+S+".gif";
            C = std::to_string(count);
            C = std::string(std::max(0, 2-(int)C.size()), '0') + C;
            dest_file = dest_data+file_num+"/"+C+".gif";
            if(filesystem::is_regular_file(target_file)){
                filesystem::rename(target_file, dest_file);
                //cout <<"change name from " << target_file << " to " << dest_file << endl;
                ++count;
            }
            else{
                //cout <<"no such file of " << target_file << endl;
            }
        }
    }
    return 0;
}