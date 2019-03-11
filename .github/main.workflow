workflow "Test and Build" {
  on = "push"
  resolves = ["Make Git Commit"]
}

action "Install" {
  uses = "actions/npm@59b64a598378f31e49cb76f27d6f3312b582f680"
  args = "install"
}

workflow "New workflow" {
  on = "push"
}

action "test" {
  uses = "actions/npm@59b64a598378f31e49cb76f27d6f3312b582f680"
  needs = ["Install"]
  args = "test"
}

action "zip" {
  uses = "actions/npm@59b64a598378f31e49cb76f27d6f3312b582f680"
  needs = ["test"]
  args = "run zip"
}

action "action a" {
  uses = "./action-a/"
}

action "Make Git Commit" {
  uses = "./.github/action-a"
  needs = ["zip"]
  secrets = ["GITHUB_TOKEN"]
}
