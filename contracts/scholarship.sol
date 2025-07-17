// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract ScholarshipSystem {
    address public teacherAddress;
    string public teacherName;
    string public teacherId;
    uint256 public totalMoney;

    constructor(string memory _name, string memory _id) {
    teacherAddress = msg.sender;
    teacherName = _name;
    teacherId = _id;
}


    struct Donor {
        string name;
        uint256 amount;
    }

    struct Student {
        string name;
        string id;
        uint8 GPA;
        uint8 attendance;
        bool claimed;
    }

    mapping(address => Donor) private donors;
    mapping(address => Student) private students;
    mapping(string => address) private studentNameToAddress; // 🆕 for name lookup

    address[] public donorAddresses;
    address[] public studentAddresses;

    function donate(string memory _name) external payable {
        require(msg.value > 0, "Donation must be greater than 0");

        if (bytes(donors[msg.sender].name).length == 0) {
            donorAddresses.push(msg.sender);
        }

        donors[msg.sender].name = _name;
        donors[msg.sender].amount += msg.value;
        totalMoney += msg.value;
    }

    function addStudent(address _student, string memory _name, string memory _id) external {
        require(msg.sender == teacherAddress, "Only teacher can add students");
        require(bytes(students[_student].name).length == 0, "Student already exists");

        students[_student] = Student(_name, _id, 0, 0, false);
        studentAddresses.push(_student);
        studentNameToAddress[_name] = _student; // 🆕 store name mapping
    }

    function updateScores(address _student, uint8 _GPA, uint8 _attendance) external {
        require(msg.sender == teacherAddress, "Only teacher can update scores");
        require(bytes(students[_student].name).length > 0, "Student not found");

        students[_student].GPA = _GPA;
        students[_student].attendance = _attendance;
    }

    function checkEligibility(address _student) public view returns (bool) {
        Student memory s = students[_student];
        return (
            bytes(s.name).length > 0 &&
            s.GPA >= 8 &&
            s.attendance >= 75 &&
            !s.claimed
        );
    }

    // 🆕 NEW: Check eligibility using student name
    function checkEligibilityByName(string memory _name) public view returns (bool) {
        address studentAddr = studentNameToAddress[_name];
        require(studentAddr != address(0), "Student not found");
        return checkEligibility(studentAddr);
    }

    function claimScholarship() external {
        require(checkEligibility(msg.sender), "Not eligible");
        require(address(this).balance >= 5 ether, "Insufficient funds");

        students[msg.sender].claimed = true;
        totalMoney -= 5 ether;
        payable(msg.sender).transfer(5 ether);
    }

    function getDonor(address _addr) external view returns (string memory, uint256) {
        Donor memory d = donors[_addr];
        require(bytes(d.name).length > 0, "Donor not found");
        return (d.name, d.amount);
    }

    function getStudent(address _addr) external view returns (string memory, string memory, uint8, uint8, bool) {
        Student memory s = students[_addr];
        require(bytes(s.name).length > 0, "Student not found");
        return (s.name, s.id, s.GPA, s.attendance, s.claimed);
    }

    function getAllDonors() external view returns (address[] memory, string[] memory) {
        string[] memory names = new string[](donorAddresses.length);
        for (uint i = 0; i < donorAddresses.length; i++) {
            names[i] = donors[donorAddresses[i]].name;
        }
        return (donorAddresses, names);
    }

    function getAllStudents() external view returns (address[] memory) {
        return studentAddresses;
    }

    function getTeacher() external view returns (string memory, string memory, address) {
        return (teacherName, teacherId, teacherAddress);
    }

    function getTotalBalance() external view returns (uint256) {
        return address(this).balance;
    }
}
