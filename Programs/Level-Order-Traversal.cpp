#include <bits/stdc++.h>

using namespace std;

struct Node
{
    int data;
    struct Node *left;
    struct Node *right;

    Node(int val)
    {
        data = val;
        left = right = NULL;
    }
};

void printLevelOrderTraversal(struct Node *root)
{
    if (root == NULL)
    {
        return;
    }
    
    queue<Node* > q;
    q.push(root);
    q.push(NULL);
    
    while (!q.empty())
    {
        Node *temp = q.front();
        q.pop();
        if (temp != NULL)
        {
            cout << temp->data << " ";
            if (temp->left)
            {
                q.push(temp->left);
            }
            if (temp->right)
            {
                q.push(temp->right);
            }
        }
        else if(!q.empty())
        {
            q.push(NULL);
        }
    }
}

int main()
{
    struct Node *root = new Node(1);
    root->left = new Node(2);
    root->right = new Node(3);
    root->left->left = new Node(4);
    root->left->right = new Node(5);
    root->right->left = new Node(6);
    root->right->right = new Node(7);

    printLevelOrderTraversal(root);

    return 0;
}